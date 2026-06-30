import React from 'react';
import RealLifeCard from '../components/RealLifeCard';
import RealLifeList from '../components/RealLifeList';

const IdeationRealLife = () => {
  return (
    <div className="space-y-6">
      <RealLifeCard icon="🎯" title="Tujuan Aktivitas" index={0}>
        <p className="body-font text-lg text-[#6C757D]">Anak belajar menghasilkan banyak ide kreatif untuk menyelesaikan masalah (brainstorming).</p>
      </RealLifeCard>

      <RealLifeCard icon="📦" title="Bahan yang Dibutuhkan" index={1}>
        <RealLifeList>
          <li>Kertas besar (A3 atau karton)</li>
          <li>Pensil warna/krayon/spidol</li>
          <li>Timer/stopwatch</li>
          <li>Sticky notes (optional)</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="📝" title="Langkah-langkah" index={2}>
        <RealLifeList ordered>
          <li>Berikan MASALAH NYATA: "Bagaimana cara kita membuat kelas lebih menyenangkan?"</li>
          <li>Set timer 3 menit - SEMUA IDE BOLEH, tidak ada yang salah!</li>
          <li>Anak menggambar/menulis sebanyak mungkin ide di kertas</li>
          <li>Dorong ide "gila" dan kreatif - semakin unik semakin bagus!</li>
          <li>Setelah waktu habis, hitung jumlah ide dan pilih 3 favorit bersama-sama</li>
          <li>Diskusikan: ide mana yang paling bisa dilakukan?</li>
        </RealLifeList>
      </RealLifeCard>

      <RealLifeCard icon="💡" title="Tips untuk Fasilitator" tone="placeholder" index={3}>
        <RealLifeList>
          <li>Tekankan KUANTITAS dulu, kualitas nanti - jangan kritik saat brainstorming!</li>
          <li>Puji setiap ide, sekecil apapun</li>
          <li>Jadilah contoh: ikut kasih ide yang "out of the box"</li>
          <li>Variasi: gunakan masalah lain seperti "Cara membantu teman yang sedih"</li>
        </RealLifeList>
      </RealLifeCard>
    </div>
  );
};

export default IdeationRealLife;
