import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const EmpathyRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar berempati dengan memahami perasaan dan masalah orang lain.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas dan pensil/krayon</li>
          <li>Ruangan tenang untuk berpasangan</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li><strong>Wawancara Mini:</strong> Anak berpasangan, saling bertanya: "Apa hal paling susah yang kamu lakukan setiap hari?"</li>
          <li>Pasangan mendengarkan baik-baik tanpa memotong</li>
          <li>Setelah wawancara, masing-masing MENGGAMBAR masalah temannya di kertas</li>
          <li>Bergantian presentasi: "Ini masalah temanku... Dia merasa..."</li>
          <li>Diskusikan: "Bagaimana kalau kita bantu? Apa yang bisa kita lakukan?"</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Ciptakan suasana aman dan tidak menghakimi</li>
          <li>Tekankan pentingnya mendengarkan dengan hati</li>
          <li>Jangan paksa anak berbagi jika tidak nyaman</li>
          <li>Fokus pada pemahaman, bukan solusi sempurna</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default EmpathyRealLife;
