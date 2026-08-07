import { useState } from 'react';
import HomePage from './components/HomePage';
import AgreementPage from './components/AgreementPage';
import ConfirmationPage from './components/ConfirmationPage';
import SavedAgreementsPage from './components/SavedAgreementsPage';
import { createAgreement } from './api';

const VIEWS = {
  HOME: 'home',
  AGREEMENT: 'agreement',
  CONFIRMATION: 'confirmation',
  SAVED: 'saved',
};

function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [savedAgreement, setSavedAgreement] = useState(null);

  const openAgreement = () => {
    setSubmitError(null);
    setView(VIEWS.AGREEMENT);
  };

  const goHome = () => setView(VIEWS.HOME);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createAgreement(payload);
      const detail = { ...payload, id: created.id, signed_at: created.signed_at };
      setSavedAgreement(detail);
      setView(VIEWS.CONFIRMATION);
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (view === VIEWS.AGREEMENT) {
    return (
      <AgreementPage
        onBack={goHome}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitError={submitError}
      />
    );
  }

  if (view === VIEWS.CONFIRMATION) {
    return (
      <ConfirmationPage
        agreement={savedAgreement}
        onBack={goHome}
        onViewSaved={() => setView(VIEWS.SAVED)}
      />
    );
  }

  if (view === VIEWS.SAVED) {
    return <SavedAgreementsPage onBack={goHome} />;
  }

  return <HomePage onOpenAgreement={openAgreement} onViewSaved={() => setView(VIEWS.SAVED)} />;
}

export default App;