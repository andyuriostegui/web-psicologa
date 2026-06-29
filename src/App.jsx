import React, { useState, useEffect, useRef } from 'react';

/* ──────────────────────────────────────────────
   HOOK: useReveal
   Detecta cuando un elemento entra en viewport
   y dispara la animación una sola vez.
   ────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ──────────────────────────────────────────────
   COMPONENTE: Reveal
   Envuelve cualquier texto/bloque y le aplica
   fade + slide sutil al entrar en pantalla.
   delay en ms para escalonar (stagger).
   ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default function App() {
  // Estado para el filtro de cualificación (Filtro UX)
  const [filtroPaso, setFiltroPaso] = useState(1);
  const [compromiso, setCompromiso] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [descripcion, setDescripcion] = useState(''); // Nuevo estado para la pregunta de la clienta

  // Estado para la descarga
  const [correoRecurso, setCorreoRecurso] = useState('');
  const [descargado, setDescargado] = useState(false);

  // Estado para el lightbox de certificados
  const [certActivo, setCertActivo] = useState(null);

  const reiniciarFiltro = () => {
    setFiltroPaso(1);
    setCompromiso(null);
    setMotivo('');
    setDescripcion('');
  };

  const handleDescarga = (e) => {
    e.preventDefault();
    if (correoRecurso.trim() !== '') setDescargado(true);
  };

  // Generador dinámico de URL de WhatsApp
  const generarEnlaceWA = () => {
    const textoBase = `Hola Nadia, he completado el filtro en tu web. Estoy buscando un proceso clínico integral y estoy lista/o para comprometerme. A grandes rasgos, lo que estoy atravesando es: "${descripcion}". Me gustaría consultar disponibilidad.`;
    return `https://wa.me/524422501507?text=${encodeURIComponent(textoBase)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-800 font-sans antialiased selection:bg-stone-200">

      {/* ESTILOS DE ANIMACIÓN — fade + slide minimalista */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Animación de entrada inmediata para el Hero (no depende de scroll) */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-anim {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Línea decorativa que se "dibuja" — toque editorial sutil */
        @keyframes drawLine {
          from { width: 0; }
          to { width: 100%; }
        }
        .draw-line {
          position: relative;
          display: inline-block;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-anim {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/50">
        <div className="flex flex-col">
          <span className="text-2xl font-serif tracking-[0.15em] text-stone-900">ÁUREA</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-0.5 font-medium">Centro Terapéutico</span>
        </div>
        <div className="space-x-8 text-xs uppercase tracking-widest font-medium opacity-80 hidden lg:flex">
          <a href="#inicio" className="hover:text-stone-900 transition">Inicio</a>
          <a href="#enfoque" className="hover:text-stone-900 transition">¿Es para ti?</a>
          <a href="#servicios" className="hover:text-stone-900 transition">Especialidades</a>
          <a href="#reconocimientos" className="hover:text-stone-900 transition">Credenciales</a>
          <a href="#filtro" className="hover:text-stone-900 transition text-emerald-800 font-bold">Solicitar Cita</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <span
              className="hero-anim inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-semibold"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
              <span>Nadia Montes Arroyo — Psicoterapeuta</span>
            </span>
            <h1
              className="hero-anim font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.1]"
              style={{ animationDelay: '0.18s' }}
            >
              Un lugar para volver a ti, con <span className="italic font-light text-emerald-800">calma</span> y claridad.
            </h1>
          </div>
          <p
            className="hero-anim text-lg text-stone-600 leading-relaxed max-w-lg font-light"
            style={{ animationDelay: '0.32s' }}
          >
            Aquí la terapia no es prisa. Es presencia, espacio y contención. Un acompañamiento clínico e integral diseñado para procesar el dolor, regular tus emociones y recuperar la coherencia interior.
          </p>
          <div
            className="hero-anim pt-4 flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: '0.46s' }}
          >
            <a href="#filtro" className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition duration-300 w-full sm:w-auto text-center shadow-lg shadow-stone-900/20">
              Consultar Disponibilidad
            </a>
            <a href="#servicios" className="text-xs uppercase tracking-widest font-medium text-stone-500 hover:text-stone-900 transition w-full sm:w-auto text-center py-4">
              Explorar Enfoques →
            </a>
          </div>
        </div>

        {/* FOTO CON BORDES SUAVES Y SOMBRA ELEGANTE */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <div
            className="hero-anim relative w-full max-w-md"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-emerald-100 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10"></div>
            <div className="w-full aspect-[4/5] bg-stone-200 overflow-hidden shadow-2xl rounded-[2.5rem]">
              <img
                src="/aureafoto.jpeg"
                alt="Nadia Montes"
                className="w-full h-full object-cover object-top hover:scale-105 transition duration-1000 ease-out"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: FILTRO VISUAL E IDENTIFICACIÓN */}
      <section id="enfoque" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal as="div" className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold block">Claridad y Honestidad</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">¿Es este el espacio adecuado para ti?</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Es para ti si... */}
            <Reveal delay={80} className="bg-emerald-50/50 p-10 rounded-3xl border border-emerald-100 space-y-6">
              <h3 className="font-serif text-2xl text-emerald-950 flex items-center">
                Este espacio es para ti si buscas:
              </h3>
              <ul className="space-y-5 text-stone-700 font-light">
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 mt-1 text-lg">✦</span>
                  <span className="leading-relaxed">Herramientas para manejar <strong>ansiedad, estrés, depresión y pensamientos persistentes</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 mt-1 text-lg">✦</span>
                  <span className="leading-relaxed">Estabilidad ante <strong>cambios intensos en tu estado de ánimo</strong> y dificultades en la regulación emocional o tus vínculos.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 mt-1 text-lg">✦</span>
                  <span className="leading-relaxed">Acompañamiento seguro durante <strong>crisis emocionales, duelos</strong> o para superar consumos problemáticos (alcohol, tabaco, sustancias).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-700 mr-3 mt-1 text-lg">✦</span>
                  <span className="leading-relaxed">Sanar a nivel profundo <strong>la relación con tu cuerpo y la comida</strong>, sin dietas restrictivas.</span>
                </li>
              </ul>
            </Reveal>

            {/* No es para ti si... */}
            <Reveal delay={160} className="bg-[#FAFAF8] p-10 rounded-3xl border border-stone-200 space-y-6">
              <h3 className="font-serif text-2xl text-stone-500 flex items-center">
                Este espacio NO es para ti si...
              </h3>
              <ul className="space-y-5 text-stone-600 font-light">
                <li className="flex items-start">
                  <span className="text-stone-300 mr-3 mt-1 text-lg">✕</span>
                  <span className="leading-relaxed">Buscas una píldora mágica o soluciones superficiales de corto plazo sin disposición a explorar tu historia.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stone-300 mr-3 mt-1 text-lg">✕</span>
                  <span className="leading-relaxed">Quieres un régimen alimenticio estricto, menús cerrados o enfoques basados en el castigo hacia tu cuerpo.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stone-300 mr-3 mt-1 text-lg">✕</span>
                  <span className="leading-relaxed">No tienes la disponibilidad de tiempo o disposición para comprometerte con sesiones regulares.</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECONOCIMIENTOS / AVALES */}
      <section id="reconocimientos" className="py-24 border-y border-stone-200/60 bg-stone-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal as="div" className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold block">Respaldo Clínico</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Formación y Acreditaciones</h2>
          </Reveal>

          <Reveal delay={80} as="div" className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h3 className="font-serif text-2xl text-stone-900 mb-1">Máster Internacional en Psicología Clínica</h3>
                <p className="text-sm text-stone-500 font-light">200 horas curriculares · Oct 2025 – Mar 2026 · Calificación sobresaliente</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-700">
                <span className="bg-emerald-50 px-3 py-1.5 rounded-full">feelink</span>
                <span className="bg-emerald-50 px-3 py-1.5 rounded-full">IPMP</span>
                <span className="bg-emerald-50 px-3 py-1.5 rounded-full">AEPSIS</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: '/master-feelink.png', label: 'Reconocimiento feelink / IPMP' },
                { src: '/master-aepsis.png', label: 'Constancia AEPSIS (España)' },
                { src: '/master-calificacion.png', label: 'Calificación sobresaliente' },
              ].map((cert, i) => (
                <button
                  key={i}
                  onClick={() => setCertActivo(cert)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-50 hover:border-emerald-500 transition duration-300"
                >
                  <img
                    src={cert.src}
                    alt={cert.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition text-white text-[10px] uppercase tracking-widest font-semibold">Ver completo</span>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* LIGHTBOX */}
        {certActivo && (
          <div
            className="fixed inset-0 bg-stone-950/90 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setCertActivo(null)}
          >
            <img
              src={certActivo.src}
              alt={certActivo.label}
              className="max-w-3xl max-h-[85vh] w-full object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setCertActivo(null)}
              className="absolute top-6 right-6 text-stone-300 hover:text-white text-3xl font-light"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        )}
      </section>

      {/* FILTRO DE CURIOSOS INTERACTIVO */}
      <section id="filtro" className="bg-stone-900 py-24 text-stone-100">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal as="div" className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold block">Admisión de Pacientes</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Solicitud de Proceso Clínico</h2>
            <p className="text-sm text-stone-400 max-w-md mx-auto font-light leading-relaxed">
              Para garantizar la calidad de la atención, Nadia revisa cada solicitud para asegurar que este sea el espacio clínico adecuado para tus necesidades.
            </p>
          </Reveal>

          <Reveal delay={100} as="div" className="bg-white text-stone-900 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 left-0 h-1 bg-emerald-100 w-full">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(filtroPaso / (motivo === 'Inmediato' || compromiso === false ? filtroPaso : 4)) * 100}%` }}
              ></div>
            </div>

            {filtroPaso === 1 && (
              <div className="space-y-8 animate-fade-in pt-4">
                <h4 className="font-serif text-xl md:text-2xl text-stone-900 text-center">1. ¿Qué tipo de acompañamiento buscas?</h4>
                <div className="grid gap-4">
                  <button onClick={() => { setMotivo('Completo'); setFiltroPaso(2); }} className="w-full text-left p-6 rounded-2xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 transition group">
                    <div className="font-medium text-stone-900 text-base mb-1">Proceso Psicoterapéutico Continuo</div>
                    <div className="text-sm text-stone-500 font-light">Sesiones semanales o quincenales para trabajo profundo.</div>
                  </button>
                  <button onClick={() => { setMotivo('Inmediato'); setFiltroPaso(2); }} className="w-full text-left p-6 rounded-2xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition">
                    <div className="font-medium text-stone-900 text-base mb-1">Consulta Única / Informativa</div>
                    <div className="text-sm text-stone-500 font-light">Solo busco resolver una duda puntual.</div>
                  </button>
                </div>
              </div>
            )}

            {filtroPaso === 2 && (
              <div className="space-y-8 animate-fade-in pt-4">
                <h4 className="font-serif text-xl md:text-2xl text-stone-900 text-center">2. El éxito requiere constancia. ¿Estás lista/o para comprometerte con tu proceso?</h4>
                <div className="grid gap-4">
                  <button onClick={() => { setCompromiso(true); setFiltroPaso(3); }} className="w-full text-center p-5 rounded-2xl border border-stone-200 hover:border-emerald-600 bg-stone-900 text-white hover:bg-emerald-900 transition font-medium">
                    Sí, dispongo de tiempo y apertura para invertir en mí.
                  </button>
                  <button onClick={() => { setCompromiso(false); setFiltroPaso(4); }} className="w-full text-center p-5 rounded-2xl border border-stone-200 hover:bg-stone-50 transition text-stone-600 font-medium">
                    Aún tengo dudas o mi horario es inestable.
                  </button>
                </div>
                <button onClick={() => setFiltroPaso(1)} className="text-xs text-stone-400 font-medium uppercase tracking-widest mx-auto block hover:text-stone-900 mt-4">← Regresar</button>
              </div>
            )}

            {filtroPaso === 3 && compromiso && (
              <div className="space-y-8 animate-fade-in pt-4">
                <h4 className="font-serif text-xl md:text-2xl text-stone-900 text-center">3. Brevemente, ¿qué situación estás atravesando en este momento?</h4>
                <p className="text-center text-xs text-stone-500 font-light -mt-4">Esto ayuda a la Psicologa a entender tu contexto antes de la primera sesión.</p>
                <div className="space-y-4">
                  <textarea
                    rows="4"
                    placeholder="Ej: Últimamente he tenido picos de ansiedad por el trabajo, me cuesta dormir y noto que uso la comida para calmarme..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-5 rounded-2xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-sm text-stone-700 bg-stone-50 resize-none"
                  ></textarea>
                  <button
                    disabled={descripcion.trim().length < 10}
                    onClick={() => setFiltroPaso(4)}
                    className="w-full text-center p-4 rounded-full bg-stone-900 text-white hover:bg-emerald-900 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente paso →
                  </button>
                </div>
                <button onClick={() => setFiltroPaso(2)} className="text-xs text-stone-400 font-medium uppercase tracking-widest mx-auto block hover:text-stone-900 mt-4">← Regresar</button>
              </div>
            )}

            {filtroPaso === 4 && (
              <div className="text-center space-y-6 py-6 animate-fade-in">
                {compromiso && motivo === 'Completo' ? (
                  <>
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">✓</div>
                    <h4 className="font-serif text-2xl text-stone-900">Perfil Confirmado</h4>
                    <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                      El enfoque de Áurea hace match con lo que buscas. Da clic abajo para solicitar fechas disponibles.
                    </p>
                    <a
                      href={generarEnlaceWA()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-emerald-700 text-white px-10 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-emerald-800 transition shadow-xl shadow-emerald-900/20 w-full md:w-auto"
                    >
                      Enviar Solicitud por WhatsApp
                    </a>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-stone-50 border border-stone-200 text-stone-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-6 shadow-sm">
                      <span className="font-serif italic">i</span>
                    </div>
                    <h4 className="font-serif text-2xl text-stone-900">Respetamos tu ritmo actual</h4>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mt-4">
                      Dar el paso de buscar apoyo es importante y totalmente válido. El enfoque clínico de Áurea está estructurado para procesos continuos, pero eso no significa que tus inquietudes deban esperar.
                    </p>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mt-3">
                      Te sugerimos comenzar explorando nuestros materiales y herramientas gratuitas mientras encuentras el momento para iniciar un proceso profundo.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                      <a
                        href="#recursos"
                        onClick={reiniciarFiltro}
                        className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs uppercase tracking-widest font-semibold hover:bg-stone-100 transition w-full sm:w-auto shadow-sm"
                      >
                        Ver Recursos
                      </a>
                      <button
                        onClick={reiniciarFiltro}
                        className="text-xs uppercase tracking-widest font-medium text-stone-400 hover:text-stone-800 transition w-full sm:w-auto"
                      >
                        Volver al inicio
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

    {/* SECCIÓN: ENLACES (LINKTREE) Y MAPA */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-24 border-t border-stone-200/60">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Lado Izquierdo: Ecosistema Digital (Storytelling + Iconos) */}
          <Reveal as="div" className="space-y-10">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold block">
                No tienes que hacerlo en soledad
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
                El acompañamiento comienza <br className="hidden md:block" />
                <span className="italic font-light text-stone-500">antes de la primera sesión</span>
              </h2>
              <p className="text-sm text-stone-600 font-light max-w-md leading-relaxed pt-2">
                Ya sea que estés lista/o para agendar tu espacio clínico o prefieras ir a tu propio ritmo explorando nuestras reflexiones y herramientas semanales, aquí tienes las puertas abiertas.
              </p>
            </div>

            <div className="space-y-4 max-w-md">

              {/* Botón WA */}
              <a href={generarEnlaceWA()} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-stone-100 text-stone-500 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-sm">
                    {/* SVG WhatsApp */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-stone-800 text-sm">Mensaje Directo</div>
                    <div className="text-[11px] text-stone-400 font-light">Atención vía WhatsApp</div>
                  </div>
                </div>
                <span className="text-stone-300 group-hover:text-emerald-600 transition transform group-hover:translate-x-1">→</span>
              </a>

              {/* Botón IG */}
              <a href="https://instagram.com/aurea.centro.t" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-stone-100 text-stone-500 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-sm">
                    {/* SVG Instagram */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-stone-800 text-sm">Comunidad Oficial</div>
                    <div className="text-[11px] text-stone-400 font-light">Reflexiones en Instagram</div>
                  </div>
                </div>
                <span className="text-stone-300 group-hover:text-emerald-600 transition transform group-hover:translate-x-1">→</span>
              </a>

              {/* Botón FB */}
              <a href="https://www.facebook.com/profile.php?id=61586878475008" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-stone-100 text-stone-500 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-sm">
                    {/* SVG Facebook */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-stone-800 text-sm">Facebook</div>
                    <div className="text-[11px] text-stone-400 font-light">Eventos y publicaciones</div>
                  </div>
                </div>
                <span className="text-stone-300 group-hover:text-emerald-600 transition transform group-hover:translate-x-1">→</span>
              </a>

            </div>
          </Reveal>

          {/* Lado Derecho: Mapa Estético */}
          <Reveal delay={100} as="div" className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold block">Ubicación del Consultorio</span>
              <p className="text-sm text-stone-700">Presencial en Querétaro, Qro. / Modalidad Online Internacional.</p>
            </div>
            <div className="w-full aspect-video lg:aspect-square max-h-[400px] bg-stone-200 rounded-[2.5rem] overflow-hidden shadow-lg group relative">
              <div className="absolute inset-0 border border-black/5 rounded-[2.5rem] pointer-events-none z-10"></div>
              <iframe
                title="Ubicación Áurea"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59759.18641973685!2d-100.44315275!3d20.5880628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b8fdc5b9253%3A0xca03faebafcdbf!2sSantiago%20de%20Quer%C3%A9taro%2C%20Qro.!5e0!3m2!1ses-419!2smx!4v1710000000000!5m2!1ses-419!2smx"
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700 ease-out"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Reveal>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-16 text-sm border-t border-stone-900 rounded-t-[3rem] mt-12 mx-2 md:mx-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-12 items-start">
          <div className="space-y-4">
            <span className="text-xl font-serif tracking-[0.15em] text-stone-200 block">ÁUREA</span>
            <p className="font-light text-stone-500 leading-relaxed max-w-xs">
              Un espacio terapéutico enfocado en la restauración de la coherencia interior y la salud integral.
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-stone-200 uppercase tracking-widest text-xs font-semibold block">Contacto</span>
            <p className="font-light hover:text-stone-200 transition cursor-pointer">WA: 442 250 1507</p>
            <p className="font-light hover:text-stone-200 transition cursor-pointer">IG: @aurea.centro.t</p>
          </div>
          <div className="space-y-3 md:text-right">
            <span className="text-stone-200 uppercase tracking-widest text-xs font-semibold block">Modalidades</span>
            <p className="font-light">Presencial en Querétaro</p>
            <p className="font-light">Videoconferencia Online</p>
            <p className="text-[10px] text-stone-600 mt-8">© {new Date().getFullYear()} ÁUREA Centro Terapéutico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}