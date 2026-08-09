import PropTypes from 'prop-types';

const HomePage = ({ onOpenAgreement, onViewSaved }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-100 flex flex-col justify-between items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* خلفية جمالية بدوائر ناعمة لمظهر رومنسي */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 sm:w-96 sm:h-96 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* الهيدر العلوي */}
      <header className="w-full max-w-4xl flex justify-between items-center pt-4 opacity-90 z-10">
        <span className="text-xl sm:text-2xl">📜✨</span>
        <span className="text-xs sm:text-sm tracking-widest text-rose-700 font-semibold uppercase text-center px-2">
          عَقْدُ الحُبِّ وَالمَوَدَّةِ
        </span>
        <span className="text-xl sm:text-2xl">💍</span>
      </header>

      {/* المحتوى الرئيسي / كارت الوثيقة */}
      <main className="my-auto text-center max-w-xl w-full z-10">
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-rose-100 transform transition-all hover:scale-[1.01]">
          
          {/* أيقونة رمزية */}
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-gray-500 text-sm font-medium mb-3 tracking-wide">
            وثيقة رسمية استثنائية
          </h2>

          {/* الزر الرئيسي - الجملة المطلوبة */}
          <button
            onClick={onOpenAgreement}
            className="group relative w-full inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base sm:text-lg font-bold rounded-2xl group bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 group-hover:from-rose-500 group-hover:to-red-600 hover:text-white text-rose-900 shadow-xl hover:shadow-rose-300/50 transition-all duration-300 active:scale-95"
          >
            <span className="relative w-full px-4 py-4 sm:px-6 sm:py-5 transition-all ease-in duration-200 bg-white rounded-[14px] group-hover:bg-opacity-0 group-hover:text-white flex items-center justify-center gap-3">
              <span className="leading-snug text-center">الوثيقة التاريخية إلى الممات</span>
              <span className="text-xl shrink-0 transition-transform group-hover:translate-x-[-4px]">
                📜
              </span>
            </span>
          </button>

          <button
            onClick={onViewSaved}
            className="group relative w-full inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-bold rounded-2xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 shadow-md hover:shadow-rose-200/50 transition-all duration-300 active:scale-95"
          >
            <span className="relative w-full px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center gap-3">
              <span className="text-xl shrink-0">📜</span>
              <span className="leading-snug text-center">
              عرض الأرشيف والاتفاقيات الموقعة
            </span>
            </span>
          </button>

          <p className="text-xs text-rose-400 mt-4 leading-relaxed">
            اضغطي على الوثيقة لعرض بنود الاتفاقية والشروط الخاصة
          </p>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="w-full text-center pb-4 text-xs text-rose-400 font-light z-10">
        تم التحرير برضا تام واختيار واعٍ ❤️
      </footer>

    </div>
  );
};

HomePage.propTypes = {
  onOpenAgreement: PropTypes.func.isRequired,
  onViewSaved: PropTypes.func.isRequired,
};

export default HomePage;
