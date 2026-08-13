import { useRef, useState } from "react";
import PropTypes from "prop-types";
import SignaturePad from "./SignaturePad";

const AgreementPage = ({ onBack, onSubmit, submitting, submitError }) => {
  const agreementBodyRef = useRef(null);
  const [husbandName, setHusbandName] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [husbandSignature, setHusbandSignature] = useState(null);
  const [wifeSignature, setWifeSignature] = useState(null);

  const canSubmit =
    husbandName.trim() && wifeName.trim() && husbandSignature && wifeSignature;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const agreement_text = agreementBodyRef.current?.innerText?.trim() || "";
    onSubmit({
      husband_name: husbandName.trim(),
      husband_signature: husbandSignature,
      wife_name: wifeName.trim(),
      wife_signature: wifeSignature,
      agreement_text,
    });
  };

  return (
    <div
      className="min-h-screen bg-[#FFF9F6] text-gray-800 flex flex-col items-center justify-center p-3 sm:p-8 font-sans relative overflow-hidden dir-rtl"
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* زر العودة للرئيسية */}
      <div className="w-full max-w-3xl mb-4 sm:mb-6 flex justify-start z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-rose-700 shadow-sm border border-rose-100 text-sm font-medium transition-all duration-300 hover:shadow-md active:scale-95"
        >
          <span>←</span>
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* وثيقة المعاهدة الرئيسية */}
      <article className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100/80 p-4 sm:p-12 relative z-10 my-4">
        <div className="border border-rose-200/60 rounded-2xl p-4 sm:p-10 bg-gradient-to-b from-rose-50/20 to-transparent">
          {/* النص المُراد حفظه في قاعدة البيانات */}
          <div ref={agreementBodyRef}>
            <header className="text-center mb-10 pb-6 border-b border-rose-100">
              <div className="text-4xl mb-3">💍📜✨</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-wide mb-2">
                اتفاقية تنظيم العناية بمظهر وملمس الشعر
              </h1>
              <p className="text-xs text-rose-600 font-semibold tracking-widest uppercase">
                معاهدة الوفاء والمودة الدائمة
              </p>
            </header>

            {/* المقدمة */}
            <section className="mb-8 leading-relaxed text-gray-700 bg-rose-50/40 p-4 sm:p-5 rounded-xl border-r-4 border-rose-400">
              <h2 className="text-sm font-bold text-rose-900 mb-2">المقدمة:</h2>
              <p className="text-sm sm:text-base">
                انطلاقاً من الرغبة المشتركة والالتزام المتبادل بين الطرفين، تم
                تحرير هذا الاتفاق برضا تام واختيار واعٍ، لتنظيم الأحكام والبنود
                المتعلقة بالمظهر و الملمس الحريري للشعر والالتزامات المتبادلة،
                على النحو التالي:
              </p>
            </section>

            {/* البنود */}
            <div className="space-y-8">
              {/* البند الأول */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند الأول: شروط العناية بالشعر ومعيار الخفة
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">
                      قاعدة عدم القص والاستثناءات:
                    </strong>{" "}
                    تلتزم الزوجة بالحفاظ على شعرها وعدم قصه نهائياً طوال فترة
                    سريان هذه الاتفاقية، وتُستثنى من ذلك حالتان فقط:
                  </p>
                  <div className="bg-rose-50/60 p-3 sm:p-4 rounded-xl space-y-2 border-r-2 border-rose-300 mr-1 sm:mr-2">
                    <p>
                      <span className="font-semibold text-rose-800">
                        الحالة الأولى:
                      </span>{" "}
                      صدور توجيه أو أمر مباشر من الزوج بقص الشعر.
                    </p>
                    <p>
                      <span className="font-semibold text-rose-800">
                        الحالة الثانية:
                      </span>{" "}
                      بلوغ طول الشعر حداً يصل إلى أسفل الوركين بمحاذاة الأفخاذ،
                      وفي هذه الحالة يحق للزوجة قصه إلى حدود منتصف الوركين.
                    </p>
                  </div>
                  <p>
                    <strong className="text-rose-950">
                      المظهر ومعايير الخفة:
                    </strong>{" "}
                    يُشترط أن يظهر الشعر بصفة مستمرة بشكل منسدل، ناعم، ورطب
                    كالحرير في مختلف الظروف والحالات.
                  </p>
                  <p>
                    <strong className="text-rose-950">
                      اختبار النفخ (النسف):
                    </strong>{" "}
                    يُشترط في جودة الشعر وحريريته أن يكون خفيفاً وناعماً للغاية؛
                    بحيث إذا قام الزوج بالنفخ عليه ("النسف عليه") يطير ويتطاير
                    مع الهواء بسهولة، ويُعد عدم تطايره مؤشراً على اختلال معايير
                    الجودة المطلوبة.
                  </p>
                </div>
              </section>

              {/* البند الثاني */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند الثاني: أحكام النظام الغذائي والرشاقة (شروط الأكل)
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">حق الأكل والتكفل:</strong>{" "}
                    يلتزم الزوج بتوفير وإحضار كل ما تشتهيه وتحبه الزوجة من طعام
                    ومأكولات دون قيود على النوعية أو الكمية.
                  </p>
                  <p>
                    <strong className="text-rose-950">
                      ضوابط القوام والرشاقة:
                    </strong>{" "}
                    للزوجة مطلق الحرية في تناول ما تشاء، بشرط المحافظة التامة
                    على منطقة البطن وعدم ظهور أي بروز أو "كرش". أما توزيع الدهون
                    في بقية المناطق الأخرى (مثل الأرداف والصدر)، فيُعتبر مقبولاً
                    ومسموحاً به ولا يُعد مخالفة للاتفاقية.
                  </p>
                  <p>
                    <strong className="text-rose-950">
                      صلاحيات الرقابة والتدابير:
                    </strong>{" "}
                    يُمنح الزوج حق فرض رقابة صارمة على منطقة البطن باستخدام
                    الوسائل والأدوات اللازمة لمتابعة ذلك. وفي حال ثبوت أي تجاوز
                    للحدود المتفق عليها في القوام، يحق للزوج اتخاذ الإجراءات
                    والتدابير التعديلية اللازمة.
                  </p>
                </div>
              </section>

              {/* البند الثالث */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند الثالث: تنظيم فترات النوم والاستيقاظ
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">
                      حرية النوم وضوابطها:
                    </strong>{" "}
                    يُكفل للزوجة الحق كاملًا في ممارسة النوم والراحة في أي وقت
                    تشاء، شريطة الالتزام بالضوابط التالية:
                  </p>
                  <div className="bg-rose-50/60 p-3 sm:p-4 rounded-xl space-y-2 border-r-2 border-rose-300 mr-1 sm:mr-2">
                    <p>
                      • ألا تُقبل على النوم إلا بعد التأكد التام من أن شعرها
                      مرتب، منسدل، ورطب كالحرير.
                    </p>
                    <p>
                      • يحق للزوج إيقاظ الزوجة من نومها متى دعت الحاجة إلى ذلك،
                      ويشمل ذلك إيقاظها للعب بها، أو الترويح عنه وإزالة
                      "الديقوطاج" بها.
                    </p>
                    <p>
                      • ألا يتسبب نومها أو تؤدي كثرته إلى أي إخلال بالواجبات
                      المنزلية أو الفرائض الدينية المطلوبة منها.
                    </p>
                  </div>
                </div>
              </section>

              {/* البند الرابع */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند الرابع: الترفيه والخروج من المنزل (التحواس)
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">طلب الترفيه:</strong> يحق
                    للزوجة المطالبة بالخروج من المنزل وقصد أماكن الترفيه
                    والاستجمام ("التحواس") بغرض الترويح عن النفس.
                  </p>
                  <p>
                    <strong className="text-rose-950">الربط بالظروف:</strong>{" "}
                    يخضع تنفيذ طلبات الخروج والترفيه لتقييم الظروف والإمكانيات
                    المتاحة للزوج.
                  </p>
                </div>
              </section>

              {/* البند الخامس */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند الخامس: تقنين مشروعية عقوبة العض عند الإخلال
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">
                      أحقية العض ومشروعيته:
                    </strong>{" "}
                    بناءً على رغبة الطرفين، يُقر الاتفاق بحق الزوج الصريح في
                    تطبيق "عقوبة العض" متى ما لمس أو لاحظ أي اختلال أو إخلال بأي
                    من شروط وأحكام هذه الاتفاقية.
                  </p>
                  <p>
                    <strong className="text-rose-950">
                      حالات تطبيق العقوبة:
                    </strong>{" "}
                    تشمل حالات استحقاق عقوبة العض - على سبيل المثال لا الحصر -
                    ما يلي:
                  </p>
                  <div className="bg-rose-50/60 p-3 sm:p-4 rounded-xl space-y-1 border-r-2 border-rose-300 mr-1 sm:mr-2 text-xs sm:text-sm">
                    <p>• فشل الشعر في اختبار النفخ ("النسف عليه ومايطيرش").</p>
                    <p>• التقصير في ترتيب الشعر وجعله كالحرير قبل النوم.</p>
                  </div>
                  <p>
                    <strong className="text-rose-950">
                      ضوابط تطبيق العقوبة:
                    </strong>{" "}
                    تُمارس هذه العقوبة بأسلوب رمزي ورومانسي لطيف يُحقق الغرض
                    التعديلي والترويحي، ودون أن يترتب عليها أي أذى جسدي أو ضرر
                    دائم. ويحق للزوج ممارسة عقوبة العض في أي منطقة أو موضع من
                    الجسم.
                  </p>
                </div>
              </section>

              {/* البند السادس */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند السادس: التزامات ومسؤوليات الطرفين العامة
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">
                      صلاحيات الإشراف والتأديب اللطيف:
                    </strong>{" "}
                    يُمنح الزوج حق تفقد ومتابعة مدى الالتزام بجميع البنود،
                    واستخدام عقوبة العض عند ثبوت المخالفة.
                  </p>
                  <p>
                    <strong className="text-rose-950">
                      التزامات الزوج المقابلة:
                    </strong>{" "}
                    يلتزم الزوج التزاماً تاماً بتلبية وتوفير أي متطلبات، أو
                    مشتريات، أو إجراءات إضافية تطلبها الزوجة وتكون ضرورية لضمان
                    نجاح هذا الاتفاق ودعمه.
                  </p>
                  <p>
                    <strong className="text-rose-950">إلزامية الحقوق:</strong>{" "}
                    تعتبر البنود الواردة أعلاه حقوقاً والتزامات مكتسبة لا يمكن
                    التنازل عنها أو إسقاطها من قبل أي طرف إلا بموافقة صريحة من
                    الطرفين.
                  </p>
                </div>
              </section>

              {/* البند السابع */}
              <section className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  البند السابع: مدة الاتفاقية ونطاقها الزمني
                </h2>
                <div className="text-sm sm:text-base leading-relaxed text-gray-700 pr-3 sm:pr-4">
                  <p>
                    <strong className="text-rose-950">
                      الاستمرارية والدوام:
                    </strong>{" "}
                    تظل هذه الاتفاقية سارية المفعول ومنتجة لكافة آثارها بصورة
                    مستمرة ودائمة، لتمتد طوال سنوات العمر وتستمر حتى مرحلة
                    الشيخوخة.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* قسم التوقيع التفاعلي */}
          <footer className="mt-12 pt-8 border-t-2 border-dashed border-rose-200">
            <h3 className="text-center text-lg font-extrabold text-rose-900 mb-6">
              ✍️ التوقيع والإقرار
            </h3>
            <p className="text-center text-xs text-rose-400 mb-6">
              اكتبا الاسمين ووقّعا أسفل الوثيقة لإتمام الاتفاقية
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* توقيع الزوج */}
              <div className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="font-bold text-rose-950">الطرف الأول (الزوج)</h4>
                <label className="block">
                  <span className="text-xs text-rose-600 block mb-1">
                    الاسم الكامل
                  </span>
                  <input
                    type="text"
                    value={husbandName}
                    onChange={(e) => setHusbandName(e.target.value)}
                    placeholder="اسم الزوج"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm"
                  />
                </label>
                <SignaturePad
                  label="التوقيع"
                  onChange={setHusbandSignature}
                  placeholder="وقع هنا كزوج"
                />
              </div>

              {/* توقيع الزوجة */}
              <div className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100 space-y-4">
                <h4 className="font-bold text-rose-950">
                  الطرف الثاني (الزوجة)
                </h4>
                <label className="block">
                  <span className="text-xs text-rose-600 block mb-1">
                    الاسم الكامل
                  </span>
                  <input
                    type="text"
                    value={wifeName}
                    onChange={(e) => setWifeName(e.target.value)}
                    placeholder="اسم الزوجة"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm"
                  />
                </label>
                <SignaturePad
                  label="التوقيع"
                  onChange={setWifeSignature}
                  placeholder="وقّعي هنا كزوجة"
                />
              </div>
            </div>

            {submitError && (
              <p className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-6">
                {submitError}
              </p>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 text-white shadow-xl hover:shadow-rose-300/50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span>
                  {submitting
                    ? "⏳ جارٍ التوقيع..."
                    : "💍 توقيع واعتماد الاتفاقية الآن"}
                </span>
              </button>
              {!canSubmit && (
                <p className="text-center text-xs text-rose-400 mt-3">
                  يلزم إدخال {husbandName.trim() ? "" : "اسم الزوج و"}{" "}
                  {wifeName.trim() ? "" : "اسم الزوجة و"} توقيع الطرفين لإتمام
                  الاتفاقية
                </p>
              )}
            </div>
          </footer>
        </div>
      </article>

      <footer className="mt-4 text-center text-xs text-rose-400 font-light z-10 pb-2">
        محفوظة بحب ومودة دائمين ❤️
      </footer>
    </div>
  );
};

AgreementPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  submitError: PropTypes.string,
};

export default AgreementPage;
