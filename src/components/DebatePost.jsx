import { useState } from 'react'
import PostComments from './PostComments'
import PostContent from './PostContent'
import postData from '../postData'

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments)
  const [formData, setFormData] = useState({
    username: '', // Kullanıcı adı
    comment: '', // Yorum metni
    isAnonymous: false, // Anonimlik durumu
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Checkbox için checked, diğerleri için value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.comment || (!formData.username && !formData.isAnonymous)) {
      alert('Lütfen tüm alanları doldurun!')
      return
    }

    const newComment = {
      id: crypto.randomUUID(),
      username: formData.isAnonymous ? 'AnonimKullanıcı' : formData.username,
      commentText: formData.comment,
    }

    setComments((prevComments) => [...prevComments, newComment])

    // Formu temizler
    setFormData({
      username: '',
      comment: '',
      isAnonymous: false,
    })
  }

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          name="comment"
          value={formData.comment || ''}
          onChange={handleChange}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  )
}
