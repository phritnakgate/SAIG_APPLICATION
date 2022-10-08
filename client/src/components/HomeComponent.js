import { DocumentCheckIcon, FaceFrownIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import NavBarComponent from './NavBarComponent'
import FooterComponent from './FooterComponent'
import { Link } from 'react-router-dom'

const features = [
  {
    name: 'CE Blog',
    description:
      'กระทู้สำหรับเด็กวิศวะคอมลาดกระบัง มีทั้งการรีวิววิชา Gened โจทย์การเขียนโปรแกรม รวมทั้งการช่วยแก้ปัญหาต่างๆ',
    icon: AcademicCapIcon,
    link: '/blog'
  },
  {
    name: 'Homework System',
    description:
      'รวมลิ้งค์การส่งงาน/เช็คการส่งงาน',
    icon: DocumentCheckIcon,
    link: '/homework'
  },
  {
    name: 'Underconstruction',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: FaceFrownIcon,
  },
  {
    name: 'Underconstruction',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: FaceFrownIcon,
  },
]


export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NavBarComponent/>
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Welcome to CE KMITL Website
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            ระบบสารสนเทศวิศวกรรมคอมพิวเตอร์
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <a className="ml-16 text-lg font-medium leading-6 text-gray-900" href={`${feature.link}` }>{feature.name}</a>
                  
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <FooterComponent/>
    </div>
  )
}