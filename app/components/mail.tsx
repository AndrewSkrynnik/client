import "./mail.css";

export const Mail = () => (
  <div className="mail-wrapper">
    <div className="mail-header">
      <div className="mail-logo-wrapper">
        <img
          src="https://res.cloudinary.com/djqpiccvn/image/upload/v1746760229/rotazap/Logo_ig7ofv.svg"
          alt="Rotazap Logo"
          className="mail-logo"
        />
      </div>
    </div>

    <div className="mail-content">
      <h2 className="mail-title">Добро пожаловать, Андрей!</h2>
      <p className="mail-text">
        Благодарим за регистрацию в{" "}
        <strong>интернет-магазине rotazap.ru</strong>.
      </p>

      <div className="mail-info-box">
        <p>
          <strong>Ваш email:</strong> exigoll@bk.ru
        </p>
      </div>

      <a href="https://rotazap.ru" target="_blank" className="mail-button">
        Перейти в магазин
      </a>

      <p className="mail-footer">
        С уважением,
        <br />
        Команда{" "}
        <a href="https://rotazap.ru" className="mail-footer-link">
          rotazap.ru
        </a>
      </p>
    </div>
  </div>
);
