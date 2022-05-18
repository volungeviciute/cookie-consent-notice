import React from 'react'
import './Popup.css'
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import SecondaryButton from '../UI/Buttons/SecondaryButton';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-content text-container">
          <h2 className="popup-title">Gerbiame Jūsų privatumą</h2>
          <p>
            Mes ir mūsų partneriai saugo ir (arba) pasiekia įrenginyje esančia
            informaciją, tokią kaip <b>slapukai</b>, ir tvarko asmens duomenis,
            tokius kaip unikalūs identifikatoriai ir standartinė įrenginio
            siunčiama informacija, kad galėtų rodyti pagal asmeninius poreikius
            pritaikytą reklamą ir turinį, vertinti reklamą ir turinį bei gauti
            įžvalgų apie auditoriją, taip pat tobulinti ir gerinti savo produktų
            kokybę. <br /> <br /> Gavę jūsų sutikimą mes ir mūsų partneriai gali
            naudoti tikslius geografinės padėties ir identifikavimo duomenis
            nuskaitę įrenginį. Galite spustelėti, kad sutinkate, jog mes ir mūsų
            partneriai tvarkytų jūsų asmens duomenis, kaip aprašyta anksčiau.
            Arba, priešingai,{" "}
            <b>
              galite gauti išsamesnės informacijos ir pakeisti savo nuostatas
              prieš sutikdami arba atsisakyti sutikti.
            </b>
            <br />
            <br />
            <b>
              Atkreipkite dėmesį, kad tvarkant kai kuriuos jūsų asmens duomenis
              jūsų sutikimas nėra būtinas, tačiau turite teisę nesutikti, kad
              duomenys būtų tvarkomi.
            </b>
          </p>
        </div>
        <div className="popup-content button-container">
          <PrimaryButton
            buttonName="Sutinku"
            onClick={() => props.setTrigger(false)}
          />
          <PrimaryButton
            buttonName="Nesutinku"
            onClick={() => props.setTrigger(false)}
          />
          <SecondaryButton
            buttonName="Daugiau pasirinkimų"
            onClick={() => {
              props.setTrigger(false);
              props.setSettingsWindow(true);
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;