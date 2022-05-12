import Footer from './UI/Footer/Footer';
import Header from './UI/Header/Header';
import Accordion from './UI/Accordion/Accordion';
import './CookieSettingsWindow.css';
import PartnersDescription from './UI/Partners/PartnersDescription';
import { Fragment, React, useState } from 'react';
import PurposeCard from './UI/PurposeCard/PurposeCard';
import Data from '../data.json';
import DataFilter from '../DataFilter';
import SummarySettingsSection from './UI/SummarySettingsSection/SummarySettingsSection';
import { useConsentContext } from '../store/ConsentContext';
import Diagram from './UI/Diagram/Diagram';
import ParsePurposes from './UI/Diagram/PurposesParser';
import {Icon} from "@iconify/react";

function CookieSettingsWindow(props) {
  const [setView, setViewState] = useState('santrauka');
  const { state, dispatch } = useConsentContext();

  const legalInterests = Data.legalInterest;
  const allPartners = Data.partners;
  const allPurposes = Data.purposes;
  const purposesAndFunctions = Data.purposesAndFunctions;
  const summarySettings = [
    {
      id: 'geographical',
      icon: 'material-symbols:share-location-rounded',
      title:
        'Tikslių geografinės vietos duomenų naudojimas ir identifikavimas skenuojant įrenginį',
      description:
        'Tikslūs geografinės vietos duomenys ir informacija apie įrenginio charakteristikas gali būti naudojami.',
      purposes: [5, 6],
    },
    {
      id: 'personal',
      icon: 'bx:user-pin',
      title:
        'Suasmeninti skelbimai ir turinys, skelbimų ir jų turinio vertinimas, auditorijos įžvalgos ir produktų kūrimas',
      description:
        'Skelbimai ir turinys gali būti suasmeninti remiantis profiliu. Norint geriau suasmeninti skelbimus ir turinį gali būti pridėta daugiau duomenų. Skelbimo ir turinio veiksmingumas gali būti įvertinamas. Galima gauti įžvalgas apie skelbimus ir turinį mačiusias auditorijas. Duomenys gali būti naudojami kurti ar pagerinti vartotojo patirtį, sistemas ir programinę įrangą.',
      purposes: [7, 8, 9, 10, 11, 12, 13, 14],
    },
  ];
  const keepInformation = DataFilter(allPurposes, [15])[0];

  return props.trigger ? (
    <div className="settings-window">
      <div className="settings-window-inner">
        <Header section={setView}></Header>
        <div className="settings-window-main">
          {setView === "santrauka" && (
            <Fragment>
              {summarySettings.map((setting) => (
                <SummarySettingsSection
                  id={setting.id}
                  icon={setting.icon}
                  title={setting.title}
                  purposes={DataFilter(allPurposes, setting.purposes)}
                  partners={allPartners}
                >
                  {setting.description}
                </SummarySettingsSection>
              ))}
              <Accordion
                required={keepInformation.required}
                icon={keepInformation.icon}
                title={keepInformation.title}
                purposesId={keepInformation.id}
                id="keepInfo"
              >
                <PurposeCard
                  id={keepInformation.id}
                  parentId="keepInfo"
                  canDo={keepInformation.legalDescription.can}
                  cantDo={keepInformation.legalDescription.cant}
                  note={keepInformation.legalDescription.note}
                  partners={DataFilter(allPartners, keepInformation.partners)}
                >
                  {keepInformation.description}
                </PurposeCard>
              </Accordion>
              {state.length > 0 && (
                <div>
                  <div className="settings-window-diagram-title">
                    <p>
                      <Icon
                        icon="dashicons:arrow-down-alt"
                        className="arrow-icon"
                        inline={true}
                      />
                      <b>Renkami duomenys</b>
                    </p>
                    <p className="tikslai">
                      <b>Tikslai</b>
                      <Icon
                        className="arrow-icon"
                        icon="dashicons:arrow-down-alt"
                        inline={true}
                      />
                    </p>
                  </div>
                  <div>
                    <Diagram
                      width={782}
                      height={290}
                      data={ParsePurposes(state)}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          )}
          {setView === "tikslai" &&
            DataFilter(allPurposes, purposesAndFunctions).map((purpose) => (
              <PurposeCard
                id={purpose.id}
                required={purpose.required}
                icon={purpose.icon}
                title={purpose.title}
                canDo={purpose.legalDescription.can}
                cantDo={purpose.legalDescription.cant}
                note={purpose.legalDescription.note}
                partners={DataFilter(allPartners, purpose.partners)}
              >
                {purpose.description}
              </PurposeCard>
            ))}
          {setView === "partneriai" &&
            allPartners.map((partner) => (
              <Accordion title={partner.title}>
                <PartnersDescription
                  privacyPolicy={partner.privacyPolicy}
                  expiryDate={partner.expiryDate}
                  purposes={DataFilter(allPurposes, partner.purposes)}
                  specialPurposes={DataFilter(
                    allPurposes,
                    partner.specialPurposes
                  )}
                  functions={DataFilter(allPurposes, partner.functions)}
                  specialFunctions={DataFilter(
                    allPurposes,
                    partner.specialFunctions
                  )}
                ></PartnersDescription>
              </Accordion>
            ))}
          {setView === "teisetas interesas" &&
            DataFilter(allPurposes, legalInterests).map((interest) => (
              <Fragment>
                <PurposeCard
                  id={interest.id}
                  icon={interest.icon}
                  title={interest.title}
                  canDo={interest.legalDescription.can}
                  cantDo={interest.legalDescription.cant}
                  note={interest.legalDescription.note}
                  partners={DataFilter(allPartners, interest.partners)}
                >
                  {interest.description}
                </PurposeCard>
              </Fragment>
            ))}
        </div>
        <Footer
          setIrasyti={() => props.setSettingsWindow(false)}
          setSantrauka={() => setViewState("santrauka")}
          setTikslai={() => setViewState("tikslai")}
          setTeisetasInteresas={() => setViewState("teisetas interesas")}
          setPartneriai={() => setViewState("partneriai")}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default CookieSettingsWindow;
