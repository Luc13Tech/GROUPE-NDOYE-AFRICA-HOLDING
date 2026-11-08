import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLang } from '../hooks/useLang';
import { useContent } from '../services/ContentProvider';
import { makeTl, pick } from '../utils/i18n';

import Reveal from '../components/Reveal';
import Hero from '../components/home/Hero';
import AdsCarousel from '../components/home/AdsCarousel';
import VillaCube from '../components/home/VillaCube';
import ServiceScenes from '../components/home/ServiceScenes';

import './home.css';
