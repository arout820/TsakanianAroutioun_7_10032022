import { useState } from 'react';
import ProfilModifyModal from './ProfilModifyModal';
import ProfilDataModal from './ProfilDataModal';

import emptyPhoto from '../../assets/profil_vide.jpg';
import Popup from '../../utils/Popup';
import PopupImage from './PopupImage';

const ProfilContainer = ({ userInfos, isLoading, error, setModification }) => {
  // toogle entre modals use state
  const [profilDataModal, setProfilDataModal] = useState(true);
  const [profilModifyModal, setProfilModifyModal] = useState(false);

  // popup changement de photo de profil
  const [buttonPopup, setButtonPopup] = useState(false);

  // Toogle entre modals fonction
  const handleModals = () => {
    if (profilDataModal === true) {
      setProfilDataModal(false);
      setProfilModifyModal(true);
    } else if (profilModifyModal === true) {
      setProfilModifyModal(false);
      setProfilDataModal(true);
    }
  };

  return (
    <>
      {isLoading && <div>En cours de traitement...</div>}
      {error && <div>Une erreur vient de se produire - {error}</div>}
      {userInfos && (
        <section className="profil-datas">
          <div className="profil-datas__photo">
            <img
              className="profil-datas__photo__img"
              src={emptyPhoto}
              alt="Logo de profil standard"
              onClick={() => setButtonPopup(true)}
            />
          </div>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <PopupImage />
          </Popup>
          <div className="container-infos">
            <button onClick={handleModals} className="container-infos__modify-account">
              Modifier le profil
            </button>
            {profilDataModal && <ProfilDataModal userInfos={userInfos} />}

            {profilModifyModal && (
              <ProfilModifyModal
                setModification={setModification}
                userInfos={userInfos}
                off={setProfilModifyModal}
                on={setProfilDataModal}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProfilContainer;