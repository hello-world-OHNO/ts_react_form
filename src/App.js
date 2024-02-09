import './App.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });

  // 送信内容を保存
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log(data);
  };

  return (
    <div>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        {/* レイアウト都合でここにエラー文を記載 */}
        {errors.name && <span>{errors.name.message}</span>}
        <div className="form-group">
          <label htmlFor="name">氏名:</label>
          <input type="text" id="name" {...register("name", { required: "未入力です" })} />
        </div>
        {errors.mailAddress && <span>正しいメールアドレスを入力してください</span>}
        <div className="form-group">
          <label htmlFor="mailAddress">メールアドレス:</label>
          <input type="text" id="mailAddress" {...register("mailAddress", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/ })} />
        </div>
        <div className="form-group">
          <label>性別:</label>
          <div className="gender-group">
            <input type="radio" id="male" value="male" {...register("gender", { required: "選択してください" })} defaultChecked />
            <label htmlFor="male">男性</label>
            <input type="radio" id="female" value="female" {...register("gender", { required: "選択してください" })} />
            <label htmlFor="female">女性</label>
          </div>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>
        <div className="form-group">
          <label>個人情報規約:</label>
          <input type="checkbox" id="agreement" {...register("agreement", { required: "チェックしてください" })} />
          <label htmlFor="agreement">チェックする</label>
          {errors.agreement && <span>{errors.agreement.message}</span>}
        </div>
        {errors.contact && <span>{errors.contact.message}</span>}
        <div className="form-group">
          <label htmlFor="contact">お問い合わせ内容:</label>
          <textarea id="contact" {...register("contact", { required: "未入力です" })}></textarea>
        </div>
        <div>
          <input className="submit" type="submit" disabled={!isValid} />
        </div>
      </form>
      {/* 送信内容を表示 */}
      {submittedData && (
        <div className="submitted-data">
          <h2>送信データ</h2>
          <p>氏名: {submittedData.name}</p>
          <p>メールアドレス: {submittedData.mailAddress}</p>
          <p>性別: {submittedData.gender}</p>
          <p>個人情報規約に同意: {submittedData.agreement ? 'はい' : 'いいえ'}</p>
          <p>お問い合わせ内容: {submittedData.contact}</p>
        </div>
      )}
    </div>
  );
}
export default App;
