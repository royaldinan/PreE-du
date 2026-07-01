import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const CauseEffectRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar memahami hubungan sebab-akibat dalam kehidupan sehari-hari.</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas dipotong jadi kartu (16-20 lembar)</li>
          <li>Pulpen atau spidol</li>
          <li>Meja atau lantai untuk menyebar kartu</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Buat 2 set kartu:<br/>- Set SEBAB: "Hujan deras", "Tidak sarapan", "Belajar giat", dll<br/>- Set AKIBAT: "Jalanan basah", "Lemas di sekolah", "Nilai bagus", dll</li>
          <li>Acak semua kartu dan sebarkan</li>
          <li>Minta anak mencocokkan sebab dengan akibat yang tepat</li>
          <li>Setelah cocok, minta mereka membuat pasangan sebab-akibat BARU sendiri!</li>
          <li>Diskusikan apakah ada satu sebab yang bisa punya banyak akibat?</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Gunakan contoh dari kehidupan sehari-hari mereka</li>
          <li>Tunjukkan bahwa satu sebab bisa punya banyak akibat (dan sebaliknya)</li>
          <li>Dorong kreativitas: "Apa lagi yang bisa terjadi kalau...?"</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default CauseEffectRealLife;
