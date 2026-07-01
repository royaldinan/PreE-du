import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const PatternRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengenali dan membuat pola berulang menggunakan benda atau gerakan.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas warna-warni (atau kertas biasa + krayon)</li>
          <li>Gunting</li>
          <li>Benda-benda berwarna di sekitar (buku, pensil, mainan)</li>
          <li>Tangan dan kaki mereka sendiri!</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li><strong>Aktivitas Gerakan:</strong> Buat pola tepuk tangan (tepuk-tepuk-diam, tepuk-tepuk-diam). Minta anak menirukan!</li>
          <li><strong>Aktivitas Benda:</strong> Susun kertas warna dengan pola (merah-biru-merah-biru-?). Minta anak lanjutkan!</li>
          <li>Minta anak membuat pola mereka sendiri untuk ditiru teman lain</li>
          <li>Variasi: gunakan suara (ding-dong-ding-dong), gerakan tubuh, atau benda berbeda</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Mulai dengan pola sederhana (A-B-A-B) baru ke yang lebih kompleks (A-A-B-A-A-B)</li>
          <li>Jadikan seperti dance atau yel-yel agar lebih seru</li>
          <li>Puji kreativitas mereka saat membuat pola sendiri</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default PatternRealLife;
