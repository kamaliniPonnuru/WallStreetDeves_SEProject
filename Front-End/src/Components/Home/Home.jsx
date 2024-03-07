import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClickLogin = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  const onButtonClickSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="HomemainContainer">
      <div className={'HometitleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'HomebuttonContainer'}>
        <input
          className={'HomeinputButton'}
          type="button"
          onClick={onButtonClickLogin}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {!loggedIn && (
          <input
            className={'HomeinputButton'}
            type="button"
            onClick={onButtonClickSignup}
            value={'Signup'}
          />
        )}
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home