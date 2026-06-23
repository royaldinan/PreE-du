import React from 'react';

const SortingRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar mengurutkan benda dari yang terkecil hingga terbesar (atau sebaliknya) seperti mengurutkan angka.</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas atau karton bekas</li>
          <li>Pulpen atau spidol</li>
          <li>Gunting (optional)</li>
          <li>Benda-benda di sekitar (buku, pensil, mainan)</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Tulis angka 1-20 di kertas terpisah (atau gunakan benda langsung)</li>
          <li>Acak semua kertas/benda di lantai atau meja</li>
          <li>Minta anak mengurutkan dari yang TERKECIL ke TERBESAR</li>
          <li>Bisa juga variasi: urutkan berdasarkan panjang kata, jumlah huruf nama, atau ukuran benda</li>
          <li>Beri pujian setiap kali mereka berhasil mengurutkan dengan benar!</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Mulai dengan angka sedikit (5-10) untuk anak yang lebih kecil</li>
          <li>Jadikan kompetisi seru: "Siapa paling cepat?"</li>
          <li>Gunakan benda nyata agar lebih konkret dan fun</li>
        </ul>
      </div>
    </div>
  );
};

export default SortingRealLife;
