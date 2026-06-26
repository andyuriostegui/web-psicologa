import React, { useState } from 'react';

export default function App() {
  // Estado para el filtro de curiosos
  const [filtroPaso, setFiltroPaso] = useState(1);
  const [compromiso, setCompromiso] = useState(null);
  const [motivo, setMotivo] = useState('');

  // Estado para la descarga del recurso gratuito
  const [correoRecurso, setCorreoRecurso] = useState('');
  const [descargado, setDescargado] = useState(false);

  const reiniciarFiltro = () => {
    setFiltroPaso(1);
    setCompromiso(null);
    setMotivo('');
  };

  const handleDescarga = (e) => {
    e.preventDefault();
    if (correoRecurso.trim() !== '') {
      setDescargado(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-800 font-sans antialiased selection:bg-stone-200">
      
      {/* NAVBAR */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-serif tracking-[0.2em] font-light text-stone-900">ÁUREA</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-0.5">Centro Terapéutico</span>
        </div>
        <div className="space-x-8 text-xs uppercase tracking-widest font-medium opacity-70 hidden md:flex">
          <a href="#inicio" className="hover:text-stone-900 transition hover:underline underline-offset-4">Inicio</a>
          <a href="#enfoque" className="hover:text-stone-900 transition hover:underline underline-offset-4">¿Es para ti?</a>
          <a href="#servicios" className="hover:text-stone-900 transition hover:underline underline-offset-4">Especialidades</a>
          <a href="#testimonios" className="hover:text-stone-900 transition hover:underline underline-offset-4">Testimonios</a>
          <a href="#recursos" className="hover:text-stone-900 transition hover:underline underline-offset-4">Recursos</a>
          <a href="#filtro" className="hover:text-stone-900 transition hover:underline underline-offset-4">Iniciar Proceso</a>
          <a href="#contacto" className="hover:text-stone-900 transition hover:underline underline-offset-4">Ubicación</a>
        </div>
      </nav>

      {/* HERO SECTION - HIGH END UX */}
      <section id="inicio" className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8 order-2 md:order-1">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-emerald-800 font-semibold block">
              Nadia Montes Arroyo — Psicología & Psiconutrición
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-950 font-normal leading-[1.15]">
              Un lugar para volver a ti, con <span className="italic font-light text-stone-600">calma</span> y claridad.
            </h1>
          </div>
          <p className="text-base text-stone-600 leading-relaxed max-w-lg">
            Aquí la terapia no es prisa. Es presencia, espacio y contención. Un acompañamiento clínico e integral diseñado para quienes buscan comprenderse, regular sus emociones y vivir con mayor coherencia interior.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="#filtro" 
              className="bg-stone-900 text-stone-50 px-8 py-4 rounded-none text-xs uppercase tracking-widest font-medium hover:bg-emerald-950 transition duration-300 w-full sm:w-auto text-center shadow-md"
            >
              Consultar Disponibilidad
            </a>
            <a 
              href="#servicios" 
              className="text-xs uppercase tracking-widest font-medium border-b border-stone-400 py-2 hover:text-stone-900 transition w-full sm:w-auto text-center"
            >
              Explorar Enfoques
            </a>
          </div>
        </div>
        
        {/* FOTO CON DISEÑO ASIMÉTRICO */}
        <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative w-full max-w-sm">
            {/* Marco decorativo sutil de fondo */}
            <div className="absolute -inset-3 border border-stone-200 rounded-none pointer-events-none translate-x-1 translate-y-1"></div>
            <div className="w-full aspect-[3/4] bg-stone-100 overflow-hidden shadow-xl grayscale-[20%] hover:grayscale-0 transition duration-700">
              <img 
                src="/aureafoto.jpeg" 
                alt="Nadia Montes Arroyo - Áurea Centro Terapéutico" 
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'center', 'p-6');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: FILTRO VISUAL E IDENTIFICACIÓN */}
      <section id="enfoque" className="max-w-6xl mx-auto px-6 py-20 border-t border-stone-200/60">
        <div className="text-center space-y-2 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Claridad y Honestidad</span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-normal">¿Es este el espacio adecuado para ti?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Es para ti si... */}
          <div className="bg-emerald-50/40 p-8 md:p-10 border border-emerald-100/70 space-y-6">
            <h3 className="font-serif text-xl text-emerald-950 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-700 mr-3"></span>
              Este espacio es para ti si...
            </h3>
            <ul className="space-y-4 text-sm text-stone-700 font-light">
              <li className="flex items-start">
                <span className="text-emerald-700 mr-3 font-semibold">→</span>
                <span>Buscas sanar a nivel profundo la relación con tu cuerpo y la comida, desvinculándote de restricciones extremas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-700 mr-3 font-semibold">→</span>
                <span>Estás lista o listo para abordar la ansiedad, el estrés o tus duelos mediante un marco clínico integral.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-700 mr-3 font-semibold">→</span>
                <span>Deseas un lugar de escucha activa, donde no haya juicios ni soluciones milagrosas de corto plazo.</span>
              </li>
            </ul>
          </div>

          {/* No es para ti si... */}
          <div className="bg-stone-100/60 p-8 md:p-10 border border-stone-200/70 space-y-6">
            <h3 className="font-serif text-xl text-stone-950 flex items-center">
              <span className="w-2 h-2 rounded-full bg-stone-400 mr-3"></span>
              Este espacio NO es para ti si...
            </h3>
            <ul className="space-y-4 text-sm text-stone-700 font-light">
              <li className="flex items-start">
                <span className="text-stone-400 mr-3 font-semibold">✕</span>
                <span>Buscas una lista típica de menús cerrados o regímenes alimenticios estandarizados y punitivos.</span>
              </li>
              <li className="flex items-start">
                <span className="text-stone-400 mr-3 font-semibold">✕</span>
                <span>Quieres un acompañamiento superficial de pocos minutos sin disposición a explorar tu historia emocional.</span>
              </li>
              <li className="flex items-start">
                <span className="text-stone-400 mr-3 font-semibold">✕</span>
                <span>No cuentas con la disposición de estructurar una constancia regular en tus sesiones semanales o quincenales.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FILOSOFÍA BREAKOUT */}
      <section className="bg-stone-900 text-stone-100 py-24 my-12">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 block">Nuestra Filosofía</span>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-200 font-light leading-relaxed max-w-3xl mx-auto">
            “Cada persona es única, cada proceso es distinto y <span className="italic text-emerald-300">cada ritmo es respetado.</span>”
          </blockquote>
          <div className="w-12 h-[1px] bg-stone-700 mx-auto"></div>
          <p className="text-sm text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
            Nuestro enfoque clínico integra la escucha empática y herramientas terapéuticas de vanguardia, buscando siempre el equilibrio emocional genuino, lejos de recetas prefabricadas.
          </p>
        </div>
      </section>

      {/* ÁREAS DE ACOMPAÑAMIENTO (GRID MEJORADO) */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Especializaciones</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-normal">Formación y Áreas Clínicas</h2>
          </div>
          <p className="text-sm text-stone-500 max-w-xs font-light">
            Especialidades estructuradas desde una mirada profunda, rigurosa y sumamente respetuosa del ser humano.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Psicología Clínica */}
          <div className="bg-white p-10 border border-stone-200/70 shadow-sm flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 inline-block">
                Máster Internacional
              </span>
              <h3 className="font-serif text-2xl text-stone-900">Psicología Clínica</h3>
              <p className="text-xs text-stone-500 leading-relaxed">Acompañamiento en crisis de salud mental y sintomatologías:</p>
              <ul className="text-xs text-stone-600 space-y-3 font-light list-none">
                <li className="flex items-start"><span className="text-emerald-700 mr-2">✓</span> Ansiedad, estrés y pensamientos persistentes.</li>
                <li className="flex items-start"><span className="text-emerald-700 mr-2">✓</span> Cambios intensos en el estado de ánimo.</li>
                <li className="flex items-start"><span className="text-emerald-700 mr-2">✓</span> Dificultades en regulación emocional y vínculos.</li>
                <li className="flex items-start"><span className="text-emerald-700 mr-2">✓</span> Consumo problemático de sustancias.</li>
                <li className="flex items-start"><span className="text-emerald-700 mr-2">✓</span> Duelos, crisis emocionales y transiciones.</li>
              </ul>
            </div>
          </div>

          {/* Psiconutrición */}
          <div className="bg-white p-10 border border-stone-200/70 shadow-sm flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 inline-block">
                Diplomatura Especializada
              </span>
              <h3 className="font-serif text-2xl text-stone-900">Psiconutrición</h3>
              <p className="text-xs text-stone-500 leading-relaxed">Intersección entre la salud psicológica y la conducta alimentaria:</p>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Evaluamos cómo las emociones (el estrés, la ansiedad, la culpa o la autoexigencia) impactan en tu cuerpo y tu alimentación. 
              </p>
              <p className="text-xs font-medium text-emerald-900 bg-stone-50 p-3 italic border-l-2 border-emerald-700">
                Abordaje clínico y respetuoso, completamente libre de dietas restrictivas.
              </p>
            </div>
          </div>

          {/* Guía Espiritual */}
          <div className="bg-white p-10 border border-stone-200/70 shadow-sm flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 inline-block">
                Trabajo Interior
              </span>
              <h3 className="font-serif text-2xl text-stone-900">Acompañamiento Emocional</h3>
              <p className="text-xs text-stone-500 leading-relaxed">Espacios de profunda introspección y claridad interior:</p>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Orientado al desarrollo de la consciencia y resolución de crisis internas existenciales. Respaldado por amplia experiencia dictando cursos y conferencias de trabajo interior.
              </p>
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">Líneas de trabajo:</span>
                <span className="text-xs text-stone-600 font-light">Presencia pura, claridad mental y guía en transiciones vitales.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: RESEÑAS / TESTIMONIOS ANÓNIMOS PROTEGIDOS */}
      <section id="testimonios" className="bg-white py-20 border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Historias de Evolución</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-normal">Testimonios de Pacientes</h2>
            <p className="text-xs text-stone-400 max-w-xs mx-auto italic font-light pt-1">Salvaguardando rigurosamente el anonimato y la confidencialidad clínica.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto针对">
            <div className="bg-[#FBFBFA] p-8 border border-stone-200/50 space-y-4 relative shadow-sm">
              <span className="text-5xl font-serif text-emerald-800/10 absolute top-4 left-4 pointer-events-none">“</span>
              <p className="text-stone-600 text-sm font-light italic leading-relaxed pt-2">
                "Inicié buscando un régimen para perder peso velozmente, pero con Nadia descubrí que mi hambre venía de la profunda ansiedad que cargaba. Ha sanado mi relación con la alimentación y conmigo misma."
              </p>
              <div className="border-t border-stone-200/60 pt-3 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                — Mariana S. <span className="text-stone-300">|</span> Psiconutrición
              </div>
            </div>

            <div className="bg-[#FBFBFA] p-8 border border-stone-200/50 space-y-4 relative shadow-sm">
              <span className="text-5xl font-serif text-emerald-800/10 absolute top-4 left-4 pointer-events-none">“</span>
              <p className="text-stone-600 text-sm font-light italic leading-relaxed pt-2">
                "Su guía va mucho más allá de lo puramente sintomático. Une la estructura clínica con un espacio de introspección espiritual y de conciencia que me devolvió la calma en momentos de crisis existencial."
              </p>
              <div className="border-t border-stone-200/60 pt-3 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                — Carlos R. <span className="text-stone-300">|</span> Guía Espiritual
              </div>
            </div>

            <div className="bg-[#FBFBFA] p-8 border border-stone-200/50 space-y-4 relative shadow-sm">
              <span className="text-5xl font-serif text-emerald-800/10 absolute top-4 left-4 pointer-events-none">“</span>
              <p className="text-stone-600 text-sm font-light italic leading-relaxed pt-2">
                "El valor de este espacio radica en la falta de prisa. Logré herramientas concretas y científicas para regular mis picos de estrés y aprender a procesar duelos que mantenía estancados."
              </p>
              <div className="border-t border-stone-200/60 pt-3 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                — Elena G. <span className="text-stone-300">|</span> Psicología Clínica
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: APARTADO DE DESCARGAS GRATUITAS (LEAD MAGNET) */}
      <section id="recursos" className="bg-[#EDF1EE] py-20 border-b border-stone-200/60">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          
          {/* Mockup del libro / descargable digital */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-44 aspect-[3/4] bg-white border border-stone-200/80 p-6 flex flex-col justify-between shadow-xl relative group transition-transform duration-500 hover:-translate-y-2">
              <div className="space-y-3">
                <span className="text-[8px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 inline-block">PDF GRATUITO</span>
                <h4 className="font-serif text-base text-stone-900 font-normal leading-snug">Guía Práctica de Mindful Eating e Introducción Emocional</h4>
              </div>
              <span className="text-[9px] text-stone-400 font-serif italic border-t border-stone-100 pt-2 block">ÁUREA Centro Terapéutico</span>
            </div>
          </div>

          {/* Información y Formulario */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 font-semibold block">Herramientas Gratuitas</span>
              <h3 className="font-serif text-3xl font-normal text-stone-950">Comienza a explorar tu relación con la comida</h3>
            </div>
            <p className="text-stone-600 text-sm font-light leading-relaxed max-w-xl">
              Nadia ha diseñado esta bitácora digital de auto-registro para ayudarte a identificar de manera consciente si estás respondiendo a un hambre puramente física o si estás utilizando los alimentos como un refugio ante la ansiedad y el estrés.
            </p>

            {!descargado ? (
              <form onSubmit={handleDescarga} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md">
                <input 
                  type="email" 
                  required
                  placeholder="Introduce tu correo electrónico" 
                  value={correoRecurso}
                  onChange={(e) => setCorreoRecurso(e.target.value)}
                  className="bg-white border border-stone-300 px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-900 flex-grow rounded-none"
                />
                <button 
                  type="submit"
                  className="bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 hover:bg-emerald-950 transition duration-300 rounded-none shadow-md"
                >
                  Descargar Material
                </button>
              </form>
            ) : (
              <div className="bg-emerald-800 text-white p-4 max-w-md text-xs tracking-wide">
                ✓ El enlace de descarga gratuita ha sido enviado a tu bandeja. Revisa tu carpeta de entrada o correo no deseado.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FILTRO DE CURIOSOS INTERACTIVO (UX COMPONENT) */}
      <section id="filtro" className="bg-stone-100 py-20 border-b border-stone-200/60">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold block">Admisión de Pacientes</span>
            <h2 className="font-serif text-3xl text-stone-950">Inicia tu Solicitud de Cita</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
              Para garantizar la calidad del acompañamiento, Nadia filtra las solicitudes para conectar con quienes buscan un proceso real.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 shadow-sm border border-stone-200 transition-all">
            {filtroPaso === 1 && (
              <div className="space-y-6">
                <h4 className="font-serif text-lg text-stone-900">1. ¿Qué tipo de proceso estás buscando actualmente?</h4>
                <div className="grid gap-3">
                  <button 
                    onClick={() => { setMotivo('Completo'); setFiltroPaso(2); }}
                    className="w-full text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-xs uppercase tracking-wider font-medium"
                  >
                    Un proceso psicoterapéutico continuo (Semanal / Quincenal)
                  </button>
                  <button 
                    onClick={() => { setMotivo('Inmediato'); setFiltroPaso(2); }}
                    className="w-full text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-xs uppercase tracking-wider font-medium"
                  >
                    Solo busco una sesión única / Consulta rápida informativa
                  </button>
                </div>
                <div className="text-center pt-2">
                  <span className="text-[10px] text-stone-400">Paso 1 de 2</span>
                </div>
              </div>
            )}

            {filtroPaso === 2 && (
              <div className="space-y-6">
                <h4 className="font-serif text-lg text-stone-900">2. El éxito de la terapia requiere constancia y apertura al cambio. ¿Estás lista/o para comprometerte con tu proceso en este momento?</h4>
                <div className="grid gap-3">
                  <button 
                    onClick={() => { setCompromiso(true); setFiltroPaso(3); }}
                    className="w-full text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-xs uppercase tracking-wider font-medium"
                  >
                    Sí, estoy dispuesta/o a invertir tiempo y energía en mí.
                  </button>
                  <button 
                    onClick={() => { setCompromiso(false); setFiltroPaso(3); }}
                    className="w-full text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-xs uppercase tracking-wider font-medium"
                  >
                    Aún tengo dudas o no dispongo de tiempo constante.
                  </button>
                </div>
                <button onClick={reiniciarFiltro} className="text-xs text-stone-400 underline hover:text-stone-600 mt-2 block">
                  ← Regresar
                </button>
              </div>
            )}

            {filtroPaso === 3 && (
              <div className="text-center space-y-6 py-4">
                {compromiso && motivo === 'Completo' ? (
                  <>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
                    <h4 className="font-serif text-xl text-stone-900">Perfil de Ingreso Confirmado</h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                      Parece que estás en el momento ideal para iniciar. Da clic abajo para enviar tu mensaje directo a WhatsApp con tu código de pre-aprobación automática.
                    </p>
                    <a 
                      href={`https://wa.me/524422501507?text=Hola%20Nadia,%20completé%20el%20filtro%20en%20tu%20web%20y%20estoy%20listo%20para%20comprometeros%20con%20un%20proceso%20clínico%20integral.`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block bg-emerald-900 text-white px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-emerald-950 transition shadow-md"
                    >
                      Solicitar Fecha de Cita por WA
                    </a>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto text-xl">!</div>
                    <h4 className="font-serif text-xl text-stone-900">Antes de dar el siguiente paso...</h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                      El enfoque de Áurea está diseñado exclusivamente para procesos de transformación profundos. Si buscas algo esporádico, te sugerimos revisar el material gratuito o nuestras conferencias informativas primero.
                    </p>
                    <div className="space-y-2 pt-2">
                      <a href="#servicios" onClick={reiniciarFiltro} className="block text-xs uppercase tracking-widest font-semibold text-stone-800 underline">
                        Revisar enfoques de nuevo
                      </a>
                      <button onClick={reiniciarFiltro} className="text-xs text-stone-400 hover:text-stone-600 block mx-auto">
                        Reiniciar cuestionario
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FORMULARIO ESTÉTICO Y MAPA DE UBICACIÓN */}
      <section id="contacto" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Formulario minimalista */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Contacto Directo</span>
            <h3 className="font-serif text-3xl text-stone-950 font-normal">Buzón de Mensajes</h3>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 block">Nombre Completo</label>
                <input type="text" className="w-full bg-transparent border-b border-stone-300 py-2 focus:border-stone-900 outline-none text-sm transition" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-stone-500 block">Correo Electrónico</label>
                <input type="email" className="w-full bg-transparent border-b border-stone-300 py-2 focus:border-stone-900 outline-none text-sm transition" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 block">¿Cuál es tu principal inquietud?</label>
              <input type="text" className="w-full bg-transparent border-b border-stone-300 py-2 focus:border-stone-900 outline-none text-sm transition" placeholder="Ej. Ansiedad, relación con el cuerpo..." />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 block">Mensaje corto adicional</label>
              <textarea rows="3" className="w-full bg-transparent border-b border-stone-300 py-2 focus:border-stone-900 outline-none text-sm transition resize-none"></textarea>
            </div>
            <button type="submit" className="bg-stone-900 text-stone-50 px-6 py-3 text-[11px] uppercase tracking-widest font-medium hover:bg-stone-800 transition">
              Enviar al Correo
            </button>
          </form>
        </div>

        {/* Mapa Estilizado */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Ubicación del Consultorio</span>
            <p className="text-sm text-stone-700">Presencial en Querétaro, Qro. / Sesiones Online Internacionales.</p>
          </div>
          {/* Contenedor del Mapa con filtros visuales premium */}
          <div className="w-full aspect-video md:aspect-[4/3] bg-stone-200 overflow-hidden border border-stone-200 shadow-inner group">
            <iframe 
              title="Ubicación Áurea"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59759.18641973685!2d-100.44315275!3d20.5880628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b8fdc5b9253%3A0xca03faebafcdbf!2sSantiago%20de%20Quer%C3%A9taro%2C%20Qro.!5e0!3m2!1ses-419!2smx!4v1710000000000!5m2!1ses-419!2smx" 
              className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER LUXURY */}
      <footer className="bg-stone-950 text-stone-400 py-16 text-xs border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-start">
          <div className="space-y-3">
            <span className="text-base font-serif tracking-widest text-stone-200 block">ÁUREA</span>
            <p className="font-light text-stone-500 leading-relaxed">
              Un espacio terapéutico enfocado en la restauración de la coherencia interior y la salud integral del individuo.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-stone-200 uppercase tracking-widest font-medium block">Contacto Directo</span>
            <p className="font-light">Citas WA: 442 250 1507</p>
            <p className="font-light">Instagram: @aurea.centro.t</p>
          </div>
          <div className="space-y-2 md:text-right">
            <span className="text-stone-200 uppercase tracking-widest font-medium block">Modalidades</span>
            <p className="font-light">Presenciales y Videoconferencia Online</p>
            <p className="text-[10px] text-stone-600 mt-6">© {new Date().getFullYear()} ÁUREA Centro Terapéutico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}