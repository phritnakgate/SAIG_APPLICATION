import NavBarComponent from "./NavBarComponent"
import FooterComponent from "./FooterComponent"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const profund = [
    { name: 'Website รายวิชา', href: 'https://sites.google.com/kmitl.ac.th/programming-fundamental/home?fbclid=IwAR3_CcCtO3WWMr0Wg1VYdBA13wpDzabTs4ppFs2lds0Wn0MXWSuRFxiiP34&pli=1&authuser=3', current: false },
    { name: 'ส่ง Lab', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfYIanTtrSO82D4Xdqz-eKpMkt27btYiqaOSJsd9-t7NRDLwQ/viewform', current: false },
    { name: 'ส่ง Weekly Program', href: 'https://docs.google.com/forms/d/e/1FAIpQLSedgCOFaN2OoBZuQZRO-5nwzDhdEFGkRkrgWfEbt3IpnSpIhw/viewform', current: false }
  ]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const HomeworkComponent = ()=>{
    return(
        <div className="container">
            <NavBarComponent/>
            <h1 className="text-center text-3xl font-bold">Homework System</h1>
            <div className="col">
            <div className="row pt-3 pb-2" style={{borderBottom:'1px solid silver'}}>
            <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">01076103_Programming Fundamental</h3>
            <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="btn btn-info">
                    LINK
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profund.map((item)=>(
                         <Menu.Item>
                         {({ active }) => (
                           <a
                             href={item.href}
                             className={classNames(item.current ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                           >
                             {item.name}
                           </a>
                         )}
                       </Menu.Item>
                      ))}
                     
                    </Menu.Items>
                  </Transition>
                </Menu>
            
            </div>
            <div className="row pt-3 pb-2" style={{borderBottom:'1px solid silver'}}>
            <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">01076101_Introduction to Computer Engineer</h3>
            </div>
            <div className="row pt-3 pb-2" style={{borderBottom:'1px solid silver'}}>
            <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">01076140_Calculus1</h3>
            </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default HomeworkComponent