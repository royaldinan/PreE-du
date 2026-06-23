import React from 'react';

const EmpathyRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar berempati dengan memahami perasaan dan masalah orang lain.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas dan pensil/krayon</li>
          <li>Ruangan tenang untuk berpasangan</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li><strong>Wawancara Mini:</strong> Anak berpasangan, saling bertanya: "Apa hal paling susah yang kamu lakukan setiap hari?"</li>
          <li>Pasangan mendengarkan baik-baik tanpa memotong</li>
          <li>Setelah wawancara, masing-masing MENGGAMBAR masalah temannya di kertas</li>
          <li>Bergantian presentasi: "Ini masalah temanku... Dia merasa..."</li>
          <li>Diskusikan: "Bagaimana kalau kita bantu? Apa yang bisa kita lakukan?"</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Ciptakan suasana aman dan tidak menghakimi</li>
          <li>Tekankan pentingnya mendengarkan dengan hati</li>
          <li>Jangan paksa anak berbagi jika tidak nyaman</li>
          <li>Fokus pada pemahaman, bukan solusi sempurna</li>
        </ul>
      </div>
    </div>
  );
};

export default EmpathyRealLife;
