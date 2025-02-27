import PetSupplies48 from '/public/icons/articles/animals.svg';
import Luggage48 from '/public/icons/articles/border-crossing.svg';
import Hail48 from '/public/icons/articles/children.svg';
import School48 from '/public/icons/articles/education.svg';
import BusinessCenter48 from '/public/icons/articles/employment.svg';
import Euro48 from '/public/icons/articles/financial-assistance.svg';
import RealEstateAgent48 from '/public/icons/articles/housing.svg';
import Gavel48 from '/public/icons/articles/legal-assistance.svg';
import Stetoscope48 from '/public/icons/articles/medicine.svg';
import FactCheck48 from '/public/icons/articles/pesel.svg';
import DirectionsBus48 from '/public/icons/articles/transport.svg';

import { IArticleItem } from 'types/article';
import { IconMap } from 'types/common';

const articleIconMap: IconMap = new Map([
  ['border-crossing', Luggage48()],
  ['housing', RealEstateAgent48()],
  ['transport', DirectionsBus48()],
  ['pesel', FactCheck48()],
  ['legal-assistance', Gavel48()],
  ['financial-assistance', Euro48()],
  ['employment', BusinessCenter48()],
  ['medicine', Stetoscope48()],
  ['education', School48()],
  ['children', Hail48()],
  ['animals', PetSupplies48()],
]);

const articleItems: IArticleItem[] = [
  {
    title: 'Перетин кордону',
    description: 'Пункти / Документи',
    iconName: 'border-crossing',
    navLink: '/articles/border-crossing',
  },
  {
    title: 'Житло',
    description: 'Безкоштовне / Оренда',
    iconName: 'housing',
    navLink: '/articles/housing',
  },
  {
    title: 'Транспорт',
    description: 'Громадський / Оренда',
    iconName: 'transport',
    navLink: '/articles/transport',
  },
  {
    title: 'PESEL',
    description: 'Порядок отримання',
    iconName: 'pesel',
    navLink: '/articles/pesel',
  },
  {
    title: 'Юридична допомога',
    description: 'Фонд справедливості',
    iconName: 'legal-assistance',
    navLink: '/articles/legal-assistance',
  },
  {
    title: 'Фінансова допомога',
    description: 'Соціальне забезпечення',
    iconName: 'financial-assistance',
    navLink: '/articles/financial-assistance',
  },
  {
    title: 'Працевлаштування',
    description: 'Пошук роботи / Страхування',
    iconName: 'employment',
    navLink: '/articles/employment',
  },
  {
    title: 'Медицина',
    description: 'Допомога від держави',
    iconName: 'medicine',
    navLink: '/articles/medicine',
  },
  {
    title: 'Освіта',
    description: 'Дошкільна / Шкільна',
    iconName: 'education',
    navLink: '/articles/education',
  },
  {
    title: 'Діти без супроводу',
    description: 'Опікунство',
    iconName: 'children',
    navLink: '/articles/children',
  },
  {
    title: 'Домашні тварини',
    description: 'Правила перевезення',
    iconName: 'animals',
    navLink: '/articles/animals',
  },
];

export { articleIconMap, articleItems };
