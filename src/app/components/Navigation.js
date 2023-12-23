import { Navbar } from 'flowbite-react';
import { useState } from 'react';

const Navigation = ({path, setPath}) => {
  const [active, setActive] = useState([false, false, false, false, false, false])

  const handleClick = (index) => {
    const newActive = [false, false, false, false, false, false]
    for (let i = 0; i < newActive.length; ++i) {
      if (index === i) {
        newActive[i] = true
      }
      else {
        newActive[i] = false
      }
    }

    setActive(newActive)

    switch(index) {
      case 0:
        setPath('accompaniment')
        break
      case 1:
        setPath('sourceSeparation')
        break
      case 2:
        setPath('textToMusic')
        break
      case 3:
        setPath('karaoke')
        break
      case 4:
        setPath('guitarTabs')
        break
      case 5:
        setPath('keyChange')
        break;
      }
  }

  return (
    <Navbar fluid style={{backgroundColor: '#FFF2F9', fontFamily: "YourFontName"}}>
      <Navbar.Brand className='pl-3'>
        <span className="self-center whitespace-nowrap text-5xl text-white font-bold" style={{color: '#FA4EAB'}}>Mouseeki</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='pt-3 pb-2'>
        <Navbar.Link onClick={() => handleClick(0)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[0] ? '#323232' : '#FA4EAB'}}>Accompaniment</Navbar.Link>
        <Navbar.Link onClick={() => handleClick(1)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[1] ? '#323232' : '#FA4EAB'}}>Source-Separation</Navbar.Link>
        <Navbar.Link onClick={() => handleClick(2)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[2] ? '#323232' : '#FA4EAB'}}>Text-to-Music</Navbar.Link>
        <Navbar.Link onClick={() => handleClick(3)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[3] ? '#323232' : '#FA4EAB'}}>Karaoke</Navbar.Link>
        <Navbar.Link onClick={() => handleClick(4)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[4] ? '#323232' : '#FA4EAB'}}>Guitar-Tabs</Navbar.Link>
        <Navbar.Link onClick={() => handleClick(5)} className='text-2xl mr-4 cursor-pointer' style={{color: !active[5] ? '#323232' : '#FA4EAB'}}>Key-Change</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;