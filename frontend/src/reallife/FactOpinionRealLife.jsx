import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const FactOpinionRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar membedakan antara fakta (yang bisa dibuktikan) dan opini (pendapat pribadi).</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas dipotong jadi strip kecil (8-10 lembar)</li>
          <li>Pulpen atau spidol</li>
          <li>2 kotak/wadah berlabel "FAKTA" dan "OPINI"</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Tulis kalimat di kertas, contoh:<br/>- "Satu minggu ada 7 hari" (FAKTA)<br/>- "Senin hari paling seru" (OPINI)<br/>- "Air diperlukan untuk hidup" (FAKTA)<br/>- "Es krim cokelat paling enak" (OPINI)</li>
          <li>Acak semua kertas</li>
          <li>Minta anak mengambil satu kertas, membacanya, lalu memasukkan ke kotak yang tepat</li>
          <li>Diskusikan MENGAPA itu fakta atau opini</li>
          <li>Lanjutkan sampai semua kertas tersortir!</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Fakta = bisa dibuktikan benar/salah. Opini = perasaan/pendapat yang beda-beda tiap orang</li>
          <li>Buat kalimat yang relate dengan kehidupan mereka</li>
          <li>Jangan koreksi terlalu keras - yang penting proses berpikirnya!</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default FactOpinionRealLife;
