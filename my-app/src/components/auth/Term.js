import React from "react";
import "../../styles/Terms.css"; // terms.css dosyasını import ediyoruz

const Terms = ({ onClose }) => {
  return (
    <div className="terms-modal">
      <div className="terms-modal-content">
        <div className="terms-container">
          <h3>User Agreement</h3>
          <p>
            This User Agreement sets out the terms you must agree to before you
            start using the platform.
          </p>
          <p>
            1. The user is obliged to use the platform only in accordance with
            legal and ethical rules.
          </p>
          <p>
            2. The User is fully responsible for the transactions carried out
            through the platform.
          </p>
          <p>
            3. The user is obliged to keep his/her personal information accurate
            and up-to-date.
          </p>
          <p>
            4. The content on the Platform is for personal use only Provided.
          </p>
          <p>
            5. The user may not share content that may damage the platform or
            violate the rights of others.
          </p>
          {/* Burada daha fazla metin eklenebilir */}
        </div>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
};

export default Terms;
