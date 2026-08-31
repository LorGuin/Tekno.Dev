import { useEffect, useRef } from 'react';

/**
 * Fondo de shader WebGL2: unas "luces" que siguen el cursor sobre fondo oscuro,
 * inspirado en el efecto de https://recent.design/i/2qggxml-ray-traced-webgl-shader
 * (no es path-tracing real: es una aproximación liviana con falloff inverso al
 * cuadrado + halo, pensada para correr fluida en un canvas de fondo).
 *
 * Se degrada solo: si el navegador no soporta WebGL2 o el usuario prefiere
 * menos movimiento, el canvas queda vacío y se ve el fondo sólido (bg-slate-950).
 */

const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 palette(float t) {
  vec3 cyan   = vec3(0.13, 0.83, 0.93); // #22d3ee
  vec3 indigo = vec3(0.31, 0.27, 0.90); // #4f46e5
  vec3 violet = vec3(0.55, 0.36, 0.96); // #8b5cf6
  if (t < 0.5) return mix(cyan, indigo, t * 2.0);
  return mix(indigo, violet, (t - 0.5) * 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 p = uv - 0.5;
  p.x *= aspect;

  vec2 mouse = u_mouse - 0.5;
  mouse.x *= aspect;

  // Base: mismo tono que bg-slate-950
  vec3 col = vec3(0.008, 0.011, 0.024);

  vec2 lights[3];
  lights[0] = mouse;
  lights[1] = vec2(sin(u_time * 0.15) * 0.6, cos(u_time * 0.12) * 0.35 - 0.25);
  lights[2] = vec2(cos(u_time * 0.10) * -0.55, sin(u_time * 0.18) * 0.30 + 0.20);

  float radii[3];
  radii[0] = 0.30;
  radii[1] = 0.42;
  radii[2] = 0.42;

  float hues[3];
  hues[0] = 0.10;
  hues[1] = 0.55;
  hues[2] = 0.85;

  float strengths[3];
  strengths[0] = 1.0;
  strengths[1] = 0.7;
  strengths[2] = 0.65;

  for (int i = 0; i < 3; i++) {
    vec2 d = p - lights[i];
    float dist2 = dot(d, d);
    // núcleo caliente chico + halo suave grande (gaussiana), estilo "glow" de luz ray-traced
    float core = strengths[i] / (dist2 * 40.0 + 0.05) * 0.05;
    float halo = strengths[i] * exp(-dist2 / (radii[i] * radii[i]));
    vec3 lightColor = palette(hues[i]);
    col += lightColor * (core + halo);
  }

  // Tonemap suave (Reinhard) para que las luces no quemen y el negro siga siendo negro
  col = col / (1.0 + col);

  float grain = (hash(gl_FragCoord.xy + fract(u_time) * 100.0) - 0.5) * 0.02;
  col += grain;

  float vig = smoothstep(1.1, 0.2, length(p));
  col *= mix(0.85, 1.0, vig);

  outColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('ShaderBackground: error compilando shader', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return; // sin WebGL2: se ve el fondo sólido, nada se rompe

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('ShaderBackground: error linkeando programa', gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Triángulo que cubre toda la pantalla, evita el seam de un quad de 2 triángulos
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };

    const setTargetFromClient = (clientX: number, clientY: number) => {
      mouseTarget.x = clientX / window.innerWidth;
      mouseTarget.y = 1 - clientY / window.innerHeight;
    };

    const onPointerMove = (e: PointerEvent) => setTargetFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTargetFromClient(t.clientX, t.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let visible = document.visibilityState === 'visible';
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!visible) return;

      // Suaviza el movimiento del cursor (lerp) para que la luz no salte
      mouse.x += (mouseTarget.x - mouse.x) * 0.08;
      mouse.y += (mouseTarget.y - mouse.y) * 0.08;

      const elapsed = reduceMotion ? 0 : (now - start) / 1000;

      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      if (vao) gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
