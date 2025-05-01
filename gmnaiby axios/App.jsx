import { useState } from "react";
import axios from "axios";

export default function App() {
  const [int, setInt] = useState("");
  const [inpt, setInpt] = useState("");

  const generateGreeting = async () => {
    try {
      // В реальном приложении вы бы отправили значение 'int' на свой сервер,
      // и сервер бы выполнил вызов API с безопасным API-ключом
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDvVXmGqbGffekch3hbXUi7eqXBn--zwwI", // Замените на фактическую конечную точку API или конечную точку сервера
        {
          contents: [{ parts: [{ text: int }] }], 
        }
        
        
      );
      console.log(response);
      setInpt(
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Нет ответа"
      );
      const th =  response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const replasmant = th.replace(/\*/g, '') 
      setInpt(replasmant)
    } catch (error) {
      console.error("Упс, что-то пошло не так:", error);
      setInpt("Ошибка генерации контента.");
    }
  };

  const handl = (e) => {
    e.preventDefault();
    generateGreeting();
  };

 
  return (
    <div className="flex justify-center">
      <form action="" onSubmit={handl}>
        <textarea
          type="text"
          className="w-[300px] h-[150px] resize-none  "
          value={int}
          onChange={(e) => setInt(e.target.value)}
        />
        <button onClick={handl}>Сгенерировать</button>
        <p style={{ whiteSpace: 'pre-wrap'}} className="w-[600px] " >{inpt}</p>
      </form>
    </div>
  );
}
