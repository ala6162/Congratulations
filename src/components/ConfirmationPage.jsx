import PropTypes from 'prop-types';

const ConfirmationPage = ({ agreement, onBack, onViewSaved }) => {
  const date = agreement?.signed_at
    ? new Date(agreement.signed_at).toLocaleString('ar-EG')
    : new Date().toLocaleString('ar-EG');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-100 flex flex-col items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100 p-6 sm:p-12 relative z-10 text-center">
        <div className="text-6xl mb-4">💍</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 mb-3">
          تم توقيع الاتفاقية بنجاح!
        </h1>
        <p className="text-rose-600 font-semibold mb-8 text-sm sm:text-base">
          عقد مبرم برضا تام واختيار واعٍ إلى الأبد ❤️
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
          <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
            <span className="text-xs text-rose-500 block mb-1">الزوج</span>
            <span className="font-bold text-rose-950">{agreement?.husband_name}</span>
            <img
              src={agreement?.husband_signature}
              alt="توقيع الزوج"
              className="mt-3 w-full h-20 object-contain bg-white rounded-xl border border-rose-100"
            />
          </div>
          <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
            <span className="text-xs text-rose-500 block mb-1">الزوجة</span>
            <span className="font-bold text-rose-950">{agreement?.wife_name}</span>
            <img
              src={agreement?.wife_signature}
              alt="توقيع الزوجة"
              className="mt-3 w-full h-20 object-contain bg-white rounded-xl border border-rose-100"
            />
          </div>
        </div>

        <p className="text-xs text-rose-400 mt-6">تاريخ التوقيع: {date}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-white text-rose-700 border border-rose-200 font-medium text-sm hover:bg-rose-50 transition-all active:scale-95"
          >
            العودة للرئيسية
          </button>
          <button
            onClick={onViewSaved}
            className="px-6 py-3 rounded-full bg-gradient-to-br from-rose-500 to-red-500 text-white font-bold text-sm shadow-lg hover:shadow-rose-300/50 transition-all active:scale-95"
          >
            📜 عرض الاتفاقيات الموقعة
          </button>
        </div>
      </main>

      <footer className="mt-6 text-center text-xs text-rose-400 font-light z-10">
        محفوظة بحب ومودة دائمين ❤️
      </footer>
    </div>
  );
};

ConfirmationPage.propTypes = {
  agreement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    husband_name: PropTypes.string,
    husband_signature: PropTypes.string,
    wife_name: PropTypes.string,
    wife_signature: PropTypes.string,
    signed_at: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onViewSaved: PropTypes.func.isRequired,
};

export default ConfirmationPage;