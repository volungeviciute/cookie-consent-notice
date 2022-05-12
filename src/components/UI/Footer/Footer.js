import React from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
import Link from '../Buttons/Link';
import './Footer.css';

function Footer(props) {
  return (
    <div className='footer-container'>
      <Link onClick={props.setSantrauka} linkText='Santrauka'/>
      <Link onClick={props.setTikslai} linkText='Konkretūs tikslai ir funkcijos'/>
      <Link onClick={props.setPartneriai} linkText='Partneriai'/>
      <Link onClick={props.setTeisetasInteresas} linkText='Teisėtas interesas'/>
      <div className='save-btn'>
      <PrimaryButton
        buttonName="Įrašyti ir išeiti"
        onClick={props.setIrasyti}
      />
      </div>
    </div>
  );
}

export default Footer