import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  fetchAgreements,
  fetchAgreement,
  updateAgreement,
  deleteAgreement,
} from "../api";
import SignaturePad from "./SignaturePad";

const SavedAgreementsPage = ({ onBack }) => {
  const [agreements, setAgreements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState(null);
  const [editing, setEditing] = useState(false);
  const [husbandName, setHusbandName] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [husbandSignature, setHusbandSignature] = useState(null);
  const [wifeSignature, setWifeSignature] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editNotice, setEditNotice] = useState(null);

  useEffect(() => {
    fetchAgreements()
      .then(setAgreements)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const openDetail = async (id) => {
    setSelected(null);
    setEditing(false);
    setEditNotice(null);
    try {
      const detail = await fetchAgreement(id);
      setSelected(detail);
      setHusbandName(detail.husband_name);
      setWifeName(detail.wife_name);
      setHusbandSignature(detail.husband_signature);
      setWifeSignature(detail.wife_signature);
    } catch (e) {
      setError(e.message);
    }
  };

  const startEdit = () => {
    setHusbandName(selected.husband_name);
    setWifeName(selected.wife_name);
    setHusbandSignature(selected.husband_signature);
    setWifeSignature(selected.wife_signature);
    setEditNotice(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setHusbandName(selected.husband_name);
    setWifeName(selected.wife_name);
    setHusbandSignature(selected.husband_signature);
    setWifeSignature(selected.wife_signature);
    setEditNotice(null);
    setEditing(false);
  };

  const saveEdit = async () => {
    if (!selected) return;
    setSaving(true);
    setEditNotice(null);
    try {
      const payload = {
        husband_name: husbandName.trim(),
        husband_signature: husbandSignature || selected.husband_signature,
        wife_name: wifeName.trim(),
        wife_signature: wifeSignature || selected.wife_signature,
        agreement_text: selected.agreement_text,
      };
      await updateAgreement(selected.id, payload);
      const refreshed = await fetchAgreement(selected.id);
      setSelected(refreshed);
      setAgreements((prev) =>
        prev.map((a) =>
          a.id === refreshed.id
            ? {
                id: refreshed.id,
                husband_name: refreshed.husband_name,
                wife_name: refreshed.wife_name,
                signed_at: refreshed.signed_at,
              }
            : a,
        ),
      );
      setEditing(false);
      setEditNotice({
        type: "success",
        message: "تم تحديث الاتفاقية بنجاح ✅",
      });
    } catch (e) {
      setEditNotice({ type: "error", message: e.message });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setNotice(null);
    try {
      await deleteAgreement(deleteTarget.id);
      setAgreements((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setNotice({ type: "success", message: "تم حذف الاتفاقية بنجاح 💔" });
    } catch (e) {
      setNotice({ type: "error", message: e.message });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FFF9F6] text-gray-800 flex flex-col items-center p-4 sm:p-8 font-sans relative overflow-hidden dir-rtl"
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl mb-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-rose-700 shadow-sm border border-rose-100 text-sm font-medium transition-all duration-300 hover:shadow-md active:scale-95"
        >
          <span>←</span>
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-sm font-bold text-rose-800">
          📜 الاتفاقيات الموقعة
        </span>
      </div>

      <main className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100 p-6 sm:p-10 relative z-10 my-4">
        {loading && (
          <p className="text-center text-rose-500 py-10">جارٍ التحميل...</p>
        )}

        {!loading && error && (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-6">
            <p className="mb-3">{error}</p>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white border border-red-200 text-sm"
            >
              العودة للرئيسية
            </button>
          </div>
        )}

        {!loading && !error && agreements.length === 0 && (
          <p className="text-center text-rose-400 py-10">
            لا توجد اتفاقيات موقعة بعد — ابدآ الحب أولاً 💗
          </p>
        )}

        {!loading && !error && agreements.length > 0 && !selected && (
          <>
            {notice && (
              <div
                className={
                  notice.type === "success"
                    ? "mb-4 text-center text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm"
                    : "mb-4 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm"
                }
              >
                {notice.message}
              </div>
            )}
            <ul className="space-y-3">
              {agreements.map((a) => (
                <li key={a.id} className="flex items-stretch gap-2">
                  <button
                    onClick={() => openDetail(a.id)}
                    className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-rose-50/40 hover:bg-rose-50 border border-rose-100 rounded-2xl px-5 py-4 transition-all active:scale-[0.99] text-right"
                  >
                    <div>
                      <p className="font-bold text-rose-950 text-sm sm:text-base">
                        💑 {a.husband_name} ❤ {a.wife_name}
                      </p>
                      <p className="text-xs text-rose-400 mt-1">
                        رقم الاتفاقية #{a.id} —{" "}
                        {new Date(a.signed_at).toLocaleString("ar-EG")}
                      </p>
                    </div>
                    <span className="text-xs text-rose-500 font-semibold whitespace-nowrap">
                      عرض نص الوثيقة الموقعة ←
                    </span>
                  </button>
                  {/* <button
                    onClick={() => setDeleteTarget(a)}
                    title="حذف الاتفاقية"
                    className="shrink-0 self-center grid place-items-center w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 hover:text-red-600 transition-all active:scale-95"
                  >
                    🗑
                  </button>*/}
                </li>
              ))}
            </ul>
          </>
        )}

        {!loading && !error && selected && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-rose-950 mb-1">
                اتفاقية #{selected.id}
              </h2>
              <p className="text-xs text-rose-400">
                {new Date(selected.signed_at).toLocaleString("ar-EG")}
              </p>
            </div>

            {selected.agreement_text && (
              <div className="mb-6 bg-white/70 border border-rose-100 rounded-2xl p-5 sm:p-6 text-right">
                <h3 className="text-sm font-extrabold text-rose-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  نص الوثيقة الموقعة
                </h3>
                <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {selected.agreement_text}
                </div>
              </div>
            )}

            {editNotice && (
              <div
                className={
                  editNotice.type === "success"
                    ? "mb-4 text-center text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm"
                    : "mb-4 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm"
                }
              >
                {editNotice.message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                <span className="text-xs text-rose-500 block mb-1">الزوج</span>
                {editing ? (
                  <div className="space-y-4">
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
                      key={`husband-${selected.id}`}
                      label="التوقيع"
                      onChange={setHusbandSignature}
                      placeholder="وقع هنا كزوج"
                      initialData={selected.husband_signature}
                    />
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-rose-950">
                      {selected.husband_name}
                    </span>
                    <img
                      src={selected.husband_signature}
                      alt="توقيع الزوج"
                      className="mt-3 w-full h-24 object-contain bg-white rounded-xl border border-rose-100"
                    />
                  </>
                )}
              </div>
              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                <span className="text-xs text-rose-500 block mb-1">الزوجة</span>
                {editing ? (
                  <div className="space-y-4">
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
                      key={`wife-${selected.id}`}
                      label="التوقيع"
                      onChange={setWifeSignature}
                      placeholder="وقّعي هنا كزوجة"
                      initialData={selected.wife_signature}
                    />
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-rose-950">
                      {selected.wife_name}
                    </span>
                    <img
                      src={selected.wife_signature}
                      alt="توقيع الزوجة"
                      className="mt-3 w-full h-24 object-contain bg-white rounded-xl border border-rose-100"
                    />
                  </>
                )}
              </div>
            </div>

            {editing ? (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-sm hover:bg-rose-100 transition-all active:scale-95 disabled:opacity-50"
                >
                  إلغاء التعديل
                </button>
                <button
                  onClick={saveEdit}
                  disabled={saving || !husbandName.trim() || !wifeName.trim()}
                  className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 text-white font-bold text-sm shadow-lg hover:shadow-rose-300/50 transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? "⏳ جارٍ الحفظ..." : "💾 حفظ التعديلات"}
                </button>
              </div>
            ) : (
              <button
                onClick={startEdit}
                className="mt-6 w-full px-6 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-sm hover:bg-rose-100 transition-all active:scale-95"
              >
                ✏️ تعديل الاسم والتوقيع
              </button>
            )}
            <button
              onClick={() => {
                setEditing(false);
                setSelected(null);
              }}
              className="mt-3 w-full px-6 py-3 rounded-2xl bg-white border border-rose-100 text-rose-500 font-bold text-sm hover:bg-rose-50 transition-all active:scale-95"
            >
              ← العودة للقائمة
            </button>
          </div>
        )}
      </main>

      <footer className="mt-4 text-center text-xs text-rose-400 font-light z-10 pb-2">
        محفوظة بحب ومودة دائمين ❤️
      </footer>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-rose-100 p-6 text-center">
            <h3 className="text-lg font-extrabold text-rose-950 mb-2">
              حذف الاتفاقية؟
            </h3>
            <p className="text-sm text-rose-500 mb-6">
              سيتم حذف اتفاقية «{deleteTarget.husband_name} ❤{" "}
              {deleteTarget.wife_name}» نهائيًا. هل أنت متأكد؟
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-sm hover:bg-rose-100 transition-all active:scale-95 disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {deleting ? "جارٍ الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SavedAgreementsPage.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default SavedAgreementsPage;
