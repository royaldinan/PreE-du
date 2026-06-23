import React from 'react';

const IdeationRealLife = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">🎯 Tujuan Aktivitas</h3>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar menghasilkan banyak ide kreatif untuk menyelesaikan masalah (brainstorming).</p>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📦 Bahan yang Dibutuhkan</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Kertas besar (A3 atau karton)</li>
          <li>Pensil warna/krayon/spidol</li>
          <li>Timer/stopwatch</li>
          <li>Sticky notes (optional)</li>
        </ul>
      </div>

      <div className="bg-[#FEFAF6] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">📝 Langkah-langkah</h3>
        <ol className="body-font text-lg text-[#6C757D] space-y-3 list-decimal list-inside">
          <li>Berikan MASALAH NYATA: "Bagaimana cara kita membuat kelas lebih menyenangkan?"</li>
          <li>Set timer 3 menit - SEMUA IDE BOLEH, tidak ada yang salah!</li>
          <li>Anak menggambar/menulis sebanyak mungkin ide di kertas</li>
          <li>Dorong ide "gila" dan kreatif - semakin unik semakin bagus!</li>
          <li>Setelah waktu habis, hitung jumlah ide dan pilih 3 favorit bersama-sama</li>
          <li>Diskusikan: ide mana yang paling bisa dilakukan?</li>
        </ol>
      </div>

      <div className="bg-[#FFD166] rounded-2xl p-6">
        <h3 className="heading-font text-xl text-[#2B2D42] mb-4">💡 Tips untuk Fasilitator</h3>
        <ul className="body-font text-lg text-[#6C757D] space-y-2 list-disc list-inside">
          <li>Tekankan KUANTITAS dulu, kualitas nanti - jangan kritik saat brainstorming!</li>
          <li>Puji setiap ide, sekecil apapun</li>
          <li>Jadilah contoh: ikut kasih ide yang "out of the box"</li>
          <li>Variasi: gunakan masalah lain seperti "Cara membantu teman yang sedih"</li>
        </ul>
      </div>
    </div>
  );
};

export default IdeationRealLife;
