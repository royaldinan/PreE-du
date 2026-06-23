import React from 'react';

const CauseEffectRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar memahami hubungan sebab-akibat dalam kehidupan sehari-hari.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas dipotong jadi kartu (16-20 lembar)</li>
          <li>Pulpen atau spidol</li>
          <li>Meja atau lantai untuk menyebar kartu</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Buat 2 set kartu:<br/>- Set SEBAB: "Hujan deras", "Tidak sarapan", "Belajar giat", dll<br/>- Set AKIBAT: "Jalanan basah", "Lemas di sekolah", "Nilai bagus", dll</li>
          <li>Acak semua kartu dan sebarkan</li>
          <li>Minta anak mencocokkan sebab dengan akibat yang tepat</li>
          <li>Setelah cocok, minta mereka membuat pasangan sebab-akibat BARU sendiri!</li>
          <li>Diskusikan apakah ada satu sebab yang bisa punya banyak akibat?</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Gunakan contoh dari kehidupan sehari-hari mereka</li>
          <li>Tunjukkan bahwa satu sebab bisa punya banyak akibat (dan sebaliknya)</li>
          <li>Dorong kreativitas: "Apa lagi yang bisa terjadi kalau...?"</li>
        </ul>
      </div>
    </div>
  );
};

export default CauseEffectRealLife;
