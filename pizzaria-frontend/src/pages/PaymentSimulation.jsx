import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentSimulation() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [mbwayNumber, setMbwayNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('fillData'); // fillData, waitPayment, confirmPayment
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Por favor, selecione um método de pagamento.';
    }

    if (paymentMethod === 'Cartão') {
      if (!cardHolder.trim()) {
        newErrors.cardHolder = 'Nome do titular é obrigatório.';
      }
      if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
        newErrors.cardNumber = 'Número do cartão inválido (16 dígitos).';
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = 'Validade inválida (MM/AA).';
      }
      if (!/^\d{3}$/.test(cvv)) {
        newErrors.cvv = 'CVV inválido (3 dígitos).';
      }
    }

    if (paymentMethod === 'PayPal') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        newErrors.paypalEmail = 'Email inválido.';
      }
    }

    if (paymentMethod === 'MB WAY') {
      if (!/^\d{9}$/.test(mbwayNumber)) {
        newErrors.mbwayNumber = 'Número MB WAY inválido (9 dígitos).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmDados = () => {
    if (!validate()) return;
    setStep('waitPayment');
  };

  const handleConfirmPagamento = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Pagamento concluído! Obrigado! 🍕');
      clearCart();
      navigate('/');
    }, 3000);
  };

  const handleConfirmPedidoDinheiro = () => {
    alert('Pedido confirmado! Pagamento em dinheiro na entrega.');
    clearCart();
    navigate('/');
  };

  // Reset form quando muda método
  const onPaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrors({});
    setStep('fillData');
    setLoading(false);
  };

  // inputs desativados se já confirmados os dados
  const inputsDisabled = step !== 'fillData';

  return (
    <div className="payment-page">
      <h1>Simulação de Pagamento</h1>

      <label>
        Método de Pagamento:
        <select value={paymentMethod} onChange={onPaymentMethodChange} disabled={loading}>
          <option value="">-- Escolha uma opção --</option>
          <option value="Cartão">Cartão de Crédito/Débito</option>
          <option value="PayPal">PayPal</option>
          <option value="MB WAY">MB WAY</option>
          <option value="Dinheiro">Dinheiro na Entrega</option>
        </select>
      </label>
      {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}

      {/* Bloco do formulário só aparece no step 'fillData' e se não for dinheiro */}
      {step === 'fillData' && paymentMethod !== 'Dinheiro' && (
        <div className="payment-form">
          {paymentMethod === 'Cartão' && (
            <>
              <label>
                Nome do Titular:
                <input
                  type="text"
                  value={cardHolder}
                  onChange={e => setCardHolder(e.target.value)}
                  placeholder="Nome igual ao cartão"
                  disabled={inputsDisabled}
                />
                {errors.cardHolder && <p className="error">{errors.cardHolder}</p>}
              </label>

              <label>
                Número do Cartão:
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  disabled={inputsDisabled}
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </label>

              <label>
                Validade (MM/AA):
                <input
                  type="text"
                  maxLength={5}
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  placeholder="MM/AA"
                  disabled={inputsDisabled}
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </label>

              <label>
                CVV:
                <input
                  type="password"
                  maxLength={3}
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  placeholder="123"
                  disabled={inputsDisabled}
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </label>
            </>
          )}

          {paymentMethod === 'PayPal' && (
            <>
              <label>
                Email do PayPal:
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={e => setPaypalEmail(e.target.value)}
                  placeholder="exemplo@paypal.com"
                  disabled={inputsDisabled}
                />
                {errors.paypalEmail && <p className="error">{errors.paypalEmail}</p>}
              </label>
              <p>Serás redirecionado para o PayPal para finalizar o pagamento (simulado).</p>
            </>
          )}

          {paymentMethod === 'MB WAY' && (
            <>
              <label>
                Número MB WAY:
                <input
                  type="tel"
                  maxLength={9}
                  value={mbwayNumber}
                  onChange={e => setMbwayNumber(e.target.value)}
                  placeholder="912345678"
                  disabled={inputsDisabled}
                />
                {errors.mbwayNumber && <p className="error">{errors.mbwayNumber}</p>}
              </label>
            </>
          )}

          <button onClick={handleConfirmDados} className="confirm-button" disabled={loading}>
            Confirmar Dados
          </button>
        </div>
      )}

      {/* Bloco da mensagem + botão confirmar pagamento aparece só no step waitPayment */}
      {step === 'waitPayment' && (
        <div className="payment-waiting">
          <p>Solicitação de pagamento enviada com sucesso. Por favor, conclua o pagamento na sua aplicação.</p>
          <button onClick={handleConfirmPagamento} className="confirm-button" disabled={loading}>
            Confirmar Pagamento
          </button>
          {loading && <p>Aguarde confirmação do pagamento... ⏳</p>}
        </div>
      )}

      {/* Caso método seja dinheiro */}
      {paymentMethod === 'Dinheiro' && (
        <>
          <p>Pagamento efetuado na entrega.</p>
          <button onClick={handleConfirmPedidoDinheiro} className="confirm-button" disabled={loading}>
            Confirmar Pedido
          </button>
        </>
      )}
    </div>
  );
}
