import React from 'react';

const FactOpinionRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar membedakan antara fakta (yang bisa dibuktikan) dan opini (pendapat pribadi).</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas dipotong jadi strip kecil (8-10 lembar)</li>
          <li>Pulpen atau spidol</li>
          <li>2 kotak/wadah berlabel "FAKTA" dan "OPINI"</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Tulis kalimat di kertas, contoh:<br/>- "Satu minggu ada 7 hari" (FAKTA)<br/>- "Senin hari paling seru" (OPINI)<br/>- "Air diperlukan untuk hidup" (FAKTA)<br/>- "Es krim cokelat paling enak" (OPINI)</li>
          <li>Acak semua kertas</li>
          <li>Minta anak mengambil satu kertas, membacanya, lalu memasukkan ke kotak yang tepat</li>
          <li>Diskusikan MENGAPA itu fakta atau opini</li>
          <li>Lanjutkan sampai semua kertas tersortir!</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Fakta = bisa dibuktikan benar/salah. Opini = perasaan/pendapat yang beda-beda tiap orang</li>
          <li>Buat kalimat yang relate dengan kehidupan mereka</li>
          <li>Jangan koreksi terlalu keras - yang penting proses berpikirnya!</li>
        </ul>
      </div>
    </div>
  );
};

export default FactOpinionRealLife;
