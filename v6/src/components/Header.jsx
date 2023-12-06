import '../styles/header.css'
import LogoImage from '../assets/logo.svg'
import AvatarImage from '../assets/najs.jpg'

const user = {
  username: 'Kox21367'
}

export const Header = (props) =>
{
    return (
        <header>
            <input placeholder='Compare with others'></input>
          <div className='profile'>
            <img className='avatar' src={AvatarImage} alt="your avatar" />
            <h3>{user.username}</h3>
          </div>
        </header>
    )
}