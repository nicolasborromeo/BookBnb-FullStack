export default function Logo() {
    return (
        <li className="logos-component" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '3px'}}>
           <img className='navigation-logo' src="/Logo.png" />
           <img className='navigation-brand' src="/brand.png" />
        </li>
    )
}
