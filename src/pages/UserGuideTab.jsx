import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  BookOpen,
  Pill,
  Users,
  Calendar,
  FileText,
  Activity,
  Palette,
  Eye,
  CheckCircle2,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { FamilyGroupModal } from '../components/modals/FamilyGroupModal';
import { MemberSelectorBar } from '../components/common/MemberSelectorBar';

export const UserGuideTab = () => {
  const { setActiveTab, familyGroupCode } = useHealth();
  const [openSection, setOpenSection] = useState('meds'); // 'meds' | 'family' | 'exams' | 'vitals' | 'a11y'
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Family Selector if in group */}
      <MemberSelectorBar
        onOpenFamilyModal={() => setIsFamilyOpen(true)}
        onAddMember={() => setIsFamilyOpen(true)}
      />

      {/* Top Banner Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, opacity: 0.9 }}>
              CENTRAL DE AJUDA & MANUAL
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Guia de Uso do Paciente</h1>
          </div>
        </div>

        <p style={{ fontSize: '14px', lineHeight: 1.5, opacity: 0.95, margin: 0 }}>
          Aprenda passo a passo como registrar medicamentos, agendar dias alternados, usar o Grupo Familiar de 6 dígitos, acompanhar exames e ajustar o visual do seu aplicativo.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: '#FFFFFF',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Ir para Meu Painel <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('medications')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Ver Medicamentos
          </button>
        </div>
      </div>

      {/* Guide Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* SECTION 1: MEDICAMENTOS */}
        <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div
            onClick={() => toggleSection('meds')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pill size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  1. Como Cadastrar e Agendar Medicamentos
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                  Uso diário, dias específicos da semana e dias alternados
                </p>
              </div>
            </div>
            {openSection === 'meds' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSection === 'meds' && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
                  🗓️ Dias Específicos da Semana (Ex: Apenas aos Domingos ou Seg, Qua, Sex):
                </h4>
                <ol style={{ paddingLeft: '20px' }}>
                  <li>Clique no botão <strong>"+ Cadastrar Medicamento"</strong>.</li>
                  <li>Digite o nome e a dosagem (ex: <i>Vitamina D3 50.000 UI</i>).</li>
                  <li>No campo <strong>Padrão de Frequência</strong>, escolha <strong>"Dias Específicos"</strong>.</li>
                  <li>Marque os dias desejados nos botões visuais (ex: marque <code>[Dom]</code> para apenas domingos).</li>
                  <li>Defina o horário e a quantidade em estoque inicial.</li>
                </ol>
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
                  🔄 Dias Alternados (Ex: Dia sim / Dia não):
                </h4>
                <ol style={{ paddingLeft: '20px' }}>
                  <li>Selecione a opção <strong>"Dias Alternados"</strong> no cadastro.</li>
                  <li>Escolha o intervalo: <i>Dia sim, dia não (48h)</i>, <i>A cada 3 dias</i> ou <i>Semanalmente</i>.</li>
                  <li>O aplicativo ajusta automaticamente a previsão de duração do seu estoque.</li>
                </ol>
              </div>

              <div style={{ background: '#E6F5F2', padding: '12px 14px', borderRadius: '12px', color: '#0D6C5D', fontWeight: 600, fontSize: '13px' }}>
                💡 <strong>Previsão de Estoque:</strong> O aplicativo alerta em amarelo/vermelho quando seu estoque de remédios estiver com 7 dias ou menos de duração.
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: GRUPO FAMILIAR */}
        <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div
            onClick={() => toggleSection('family')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  2. Guia do Grupo Familiar (Código de 6 Dígitos)
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                  Compartilhamento em tempo real com familiares e cuidadores
                </p>
              </div>
            </div>
            {openSection === 'family' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSection === 'family' && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
                  👥 Criando ou Entrando em um Grupo:
                </h4>
                <ul style={{ paddingLeft: '20px' }}>
                  <li><strong>Para Criar:</strong> Clique em <strong>"+ Grupo Familiar"</strong> &gt; <strong>"Criar Novo Grupo"</strong>. O aplicativo gera um PIN de 6 dígitos (ex: <code>842917</code>).</li>
                  <li><strong>Para Compartilhar:</strong> Use o botão <strong>"Enviar no WhatsApp"</strong> no modal para mandar o PIN direto para parentes.</li>
                  <li><strong>Para Entrar:</strong> O familiar digita o código de 6 dígitos no campo <strong>"Entrar com Código"</strong>.</li>
                </ul>
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
                  👨‍👩‍👧 Alternando a Visão entre Familiares:
                </h4>
                <p>
                  Quando conectado ao Grupo Familiar, uma barra no topo exibe avatares dos membros (<code>[Mateus]</code> <code>[Ana]</code> <code>[Maria - Mãe]</code>). Basta clicar no nome do familiar para ver e atualizar os medicamentos, exames e sinais vitais dele em tempo real!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: EXAMES & CONSULTAS */}
        <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div
            onClick={() => toggleSection('exams')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  3. Exames, Laudos & Consultas Médicas
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                  Anexo de laudos PDF, instruções de preparo e calendário
                </p>
              </div>
            </div>
            {openSection === 'exams' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSection === 'exams' && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Visualizar Laudo PDF:</strong> Na aba <strong>Exames</strong>, clique em um exame disponível para abrir a visualização em PDF.</li>
                <li><strong>Instruções de Preparo:</strong> Para exames agendados (ex: Ultrassom), clique no exame para ler a lista de recomendações de jejum e água.</li>
                <li><strong>Consultas Médicas:</strong> Agende consultas com especialidade e endereço do consultório. Use o botão <strong>"Ver Detalhes"</strong> para abrir o mapa com o local exato.</li>
              </ul>
            </div>
          )}
        </div>

        {/* SECTION 4: CORES & ACESSIBILIDADE */}
        <div className="card" style={{ padding: '20px', borderRadius: '20px' }}>
          <div
            onClick={() => toggleSection('a11y')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                  4. Cores do Aplicativo & Ferramentas de Acessibilidade
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                  Tamanho de fonte, modo alto contraste e síntese de voz
                </p>
              </div>
            </div>
            {openSection === 'a11y' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSection === 'a11y' && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Trocar Cor do App:</strong> Vá até a aba <strong>Meu Perfil</strong> &gt; <strong>"Aparência & Cores"</strong> e escolha entre 6 cores (Verde, Azul, Roxo, Rosa, Laranja ou Modo Escuro).</li>
                <li><strong>Aumentar Tamanho da Fonte:</strong> No painel de Acessibilidade, escolha o tamanho de texto <i>Grande (+12%)</i> ou <i>Extra (+25%)</i>.</li>
                <li><strong>Leitor de Resumo por Voz:</strong> Na tela de início, clique em <strong>"Ouvir Resumo"</strong> para que o assistente leia os compromissos em português.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <FamilyGroupModal isOpen={isFamilyOpen} onClose={() => setIsFamilyOpen(false)} />
    </div>
  );
};
