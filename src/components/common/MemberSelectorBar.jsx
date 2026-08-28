import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Users, UserPlus, CheckCircle2 } from 'lucide-react';

export const MemberSelectorBar = ({ onOpenFamilyModal, onAddMember }) => {
  const { familyGroupCode, familyGroup, activeMemberName, setActiveMemberName, userProfile } = useHealth();

  if (!familyGroupCode) return null;

  const members = familyGroup?.members || [{ name: userProfile?.name || 'Você', role: 'Criador' }];

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#E6F5F2', color: '#0D6C5D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
              {familyGroup?.familyName || 'Grupo Familiar'} • Selecione o Membro
            </h4>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Alternar visão de medicamentos, consultas e sinais vitais
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFamilyModal}
          style={{
            background: '#F1F5F9',
            border: 'none',
            color: '#0D6C5D',
            padding: '5px 12px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Users size={13} /> Gerenciar Grupo ({familyGroupCode})
        </button>
      </div>

      {/* Member Avatar Chips */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {members.map((member, idx) => {
          const isSelected = (activeMemberName || userProfile?.name) === member.name;
          const initial = member.name ? member.name.charAt(0).toUpperCase() : 'M';

          return (
            <button
              key={idx}
              onClick={() => setActiveMemberName(member.name)}
              style={{
                background: isSelected ? '#0D6C5D' : '#F8FAFC',
                color: isSelected ? '#FFFFFF' : '#334155',
                border: isSelected ? '2px solid #0D6C5D' : '1px solid #CBD5E1',
                borderRadius: '100px',
                padding: '6px 14px 6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(13, 108, 93, 0.2)' : 'none'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isSelected ? '#FFFFFF' : '#E2E8F0',
                  color: isSelected ? '#0D6C5D' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '12px'
                }}
              >
                {initial}
              </div>
              <span>{member.name}</span>
              {isSelected && <CheckCircle2 size={14} style={{ color: '#FFFFFF' }} />}
            </button>
          );
        })}

        {onAddMember && (
          <button
            onClick={onAddMember}
            style={{
              background: '#E6F5F2',
              color: '#0D6C5D',
              border: '1px dashed #0D6C5D',
              borderRadius: '100px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <UserPlus size={14} /> + Novo Familiar
          </button>
        )}
      </div>
    </div>
  );
};
