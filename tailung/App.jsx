import React from 'react';

const CarListing = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          src="https://avtoprokatalmaty.kz/wp-content/uploads/2020/11/1603457110MKitJW5jweNmMUcD.jpg"
          alt="Toyota Camry 2023"
          className="rounded-2xl shadow-md"
        />
        <div className="mt-4 flex space-x-2">
          <img src="https://avtoprokatalmaty.kz/wp-content/uploads/2020/11/1603457110MKitJW5jweNmMUcD.jpg" alt="thumb1" className="w-20 h-14 rounded-xl" />
          <img src="https://avtoprokatalmaty.kz/wp-content/uploads/2020/11/1603457110MKitJW5jweNmMUcD.jpg" alt="thumb2" className="w-20 h-14 rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl shadow-xl p-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Toyota Camry 2023 г.</h2>
          <p className="text-xl font-semibold text-red-600 mb-2">17 400 000 ₸</p>
          <p className="text-gray-500 mb-2">Ежемесячный платёж: <span className="text-black font-semibold">509 062 ₸</span></p>
          <p className="text-gray-500 mb-4">Первоначальный взнос: <span className="text-black font-semibold">1 740 000 ₸</span></p>
          <button className="bg-red-500 hover:bg-red-600 text-white w-full mb-4">Рассчитать Кредит</button>

          <div className="space-y-2 text-sm">
            <p><strong>Город:</strong> Алматы</p>
            <p><strong>Поколение:</strong> 2020 - н.в. XV70 рестайлинг (V75)</p>
            <p><strong>Кузов:</strong> Седан</p>
            <p><strong>Объём двигателя:</strong> 2.5 (бензин)</p>
            <p><strong>Пробег:</strong> 62 000 км</p>
            <p><strong>Коробка передач:</strong> Автомат</p>
            <p><strong>Привод:</strong> Передний привод</p>
            <p><strong>Руль:</strong> Слева</p>
            <p><strong>Цвет:</strong> Белый металлик</p>
            <p><strong>Растаможен в Казахстане:</strong> Да</p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Комментарий продавца</h3>
            <p>Второй хозяин. Машина Дилерская. Никаких повреждений и ДТП. В родном окрасе</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
