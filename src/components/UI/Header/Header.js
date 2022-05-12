import React from 'react';
import Link from '../Buttons/Link';
import './Header.css';
import { useConsentContext } from '../../../store/ConsentContext';

function Header(props) {
  const { dispatch } = useConsentContext();

  function renderText(param) {
    switch (param) {
      case 'partneriai':
        return (
          <p>
            Peržiūrėkite ir nustatykite savo sutikimo nuostatas kiekvienam
            partneriui toliau. Išskleiskite kiekvieną partnerių sąrašo elementą,
            kad gautumėte daugiau informacijos ir galėtumėte pasirinkti. <br />{' '}
            <b>
              Kai kurie asmens duomenys gali būti tvarkomi be jūsų sutikimo, bet
              jūs turite teisę nesutikti.
            </b>
          </p>
        );
      case 'teisetas interesas':
        return (
          <p>
            <b>
              Peržiūrėkite ir nesutikite, kad asmens duomenys būtų tvarkomi be
              jūsų sutikimo remdamiesi teisėtu interesu kiekvienam tikslui ir
              kiekvieno toliau pateikiamo partnerio interesu.
            </b>
            <br /> Išskleiskite kiekvieną tikslą arba partnerių sąrašo elementą,
            kad gautumėte daugiau informacijos ir galėtumėte pasirinkti.
          </p>
        );
      default:
        return (
          <p>
            Mes ir mūsų partneriai saugo ir (arba) pasiekia įrenginyje esančią
            informaciją, tokią kaip <b>slapukai</b>, ir{' '}
            <b>apdoroja asmens duomenis</b>, tokius kaip unikalūs
            identifikatoriai ir standartinė įrenginio siunčiama informacija,
            skirta toliau nurodytiems tikslams. <br />
            <b>
              Atkreipkite dėmesį, kad tvarkant kai kuriuos jūsų asmens duomenis
              jūsų sutikimas nėra būtinas, tačiau turite teisę nesutikti, kad
              duomenys būtų tvarkomi
            </b>
            . Galite pakeisti savo nuostatas bet kuriuo metu grįžę į šią
            svetainę arba apsilankę puslapyje, kuriame pateikiama mūsų{' '}
            <a href='https://www.lrytas.lt/atsakomybe/'>privatumo politika</a>.
          </p>
        );
    }
  }

  return (
    <div>
      <div className='header-container'>
        <h2 className='title'>Gerbiame jūsų privatumą</h2>
        <br />
        {renderText(props.section)}
      </div>
      <div className='button-container'>
        <Link
          linkText='Nesutinku su viskuo'
          onClick={() => dispatch({ type: 'remove-all' })}
        ></Link>
        <Link
          linkText='Sutinku su viskuo'
          onClick={() => dispatch({ type: 'add-all' })}
        ></Link>
      </div>
    </div>
  );
}

export default Header;
