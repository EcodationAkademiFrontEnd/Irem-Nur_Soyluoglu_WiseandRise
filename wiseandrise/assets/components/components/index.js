import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import FsLightbox from "fslightbox-react";
import HomeTitileComponent from "./components/HomeTitileCom";
import { Helmet } from "react-helmet";
import icon from "../../assets/video/trailer.mp4";
import SwiperCore, { EffectFade, Navigation, Thumbs, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import CEOComent from "./components/CEOComent";
import TeacherComponent from "./components/TeacherComponent";
import HomeFooterComponent from "./components/HomeFooterCom";
import ClassesSlider from "../../components/ClassesSlider";
import Sliders from "../../components/Sliders";
import CategoryList from "./components/CategoryList";
import TeachersSlider from "../../components/TeachersSlider";
import VerticalSlider from "./components/VerticalSlider";
import { useAuth } from "../../contexts/AuthContext";
import HomeTitileComponentInLogin from "./components/HomeTitileComInLogin";
import SliderCW from "../../components/ContinuesWatching/SliderCW";
import NewClassroomBlock from "./components/NewClassroomBlock";
import { getPlans } from "../../Services/AuthApi";
import "./style.css";
SwiperCore.use([EffectFade, Navigation, Thumbs, Pagination]);

const gsapAnimate = {
  getData: (elem) => {
    const option = {
      opacity: 0,
      scale: 1,
      position: {
        x: 0,
        y: 0,
      },
      ease: "",
      duration: 1,
      delay: 0.4,
      rotate: 0,
    };
    if (elem !== undefined) {
      option.position.x = gsapAnimate.validValue(elem.dataset.iqPositionX, 0);

      option.position.y = gsapAnimate.validValue(elem.dataset.iqPositionY, 0);

      option.rotate = gsapAnimate.validValue(elem.dataset.iqRotate, 0);

      option.scale = gsapAnimate.validValue(elem.dataset.iqScale, 1);

      option.opacity = gsapAnimate.validValue(elem.dataset.iqOpacity, 0);

      option.delay = gsapAnimate.validValue(elem.dataset.iqDelay, 0.4);

      option.duration = gsapAnimate.validValue(elem.dataset.iqDuration, 1.5);

      option.ease = gsapAnimate.validValue(elem.dataset.iqEase, "");

      const setOption = {
        opacity: option.opacity,
        scale: option.scale,
        x: option.position.x,
        y: option.position.y,
        ease: option.ease,
        rotate: option.rotate,
        duration: option.duration,
        delay: option.delay,
      };

      return setOption;
    } else {
      return { opacity: 0 };
    }
  },
  onStart: (elem) => {
    const setOption = gsapAnimate.getData(elem);

    gsap.from(elem, setOption);
  },

  onEnd: (elem) => {
    const setOption = gsapAnimate.getData(elem);

    gsap.to(elem, setOption);
  },

  onStartEnd: (elem) => {
    const setOption = gsapAnimate.getData(elem);

    const setEndOption = gsapAnimate.getData(elem);

    setEndOption.opacity = 1;

    setEndOption.x = 0;

    setEndOption.y = 0;

    setEndOption.rotate = 0;

    setEndOption.scale = 1;

    gsap.fromTo(elem, setOption, setEndOption);
  },
  validValue: (attr, defaultVal) => {
    if (attr !== undefined && attr !== null) {
      return Number(attr);
    }
    return Number(defaultVal);
  },
};

const Homepage = () => {
  const { inLogin } = useAuth();

  const [cominSoon, setComingSoon] = useState(true);
  const [selected, setSelected] = useState(true);
  const cominSoonF = (control) => {
    setComingSoon(control);
  };
  const selectedF = (control) => {
    setSelected(control);
  };
  const [price, setPrice] = useState([{ price: "59.9" }, { price: "99" }]);
  useEffect(() => {
    getPlans("Monthly").then((res) => {
      setPrice(res.data);
    });
    return () => {};
  }, []);
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Wise&Rise",
        item: "https://www.wisenrise.com",
      },
    ],
  };
  const ldJsonOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://www.wisenrise.com",
    logo: "https://www.wisenrise.com/wise&rise.png",
  };
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Alanında seçkin uzman liderlerinden 150'den fazla eğitime sınırsız erişim imkanı. İlgi alanınıza yönelik eğitimleri izleyerek kendini geliştir."
        />
        <script type="application/ld+json">
          {JSON.stringify(ldJsonOrganization)}
        </script>
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <section
        id="home"
        className="iq-main-slider p-0 iq-rtl-direction overflow-hidden">
        {inLogin ? <HomeTitileComponentInLogin /> : <HomeTitileComponent />}
      </section>
      {!inLogin && (
        <section className="home-page  my-0 my-xs-2 my-md-5 pt-0 pb-3">
          <Container className="position-relative h-100">
            <div className="slider-inner h-100">
              <Row>
                <Col sm="12" md="6" className="mt-2">
                  <h4
                    className="title"
                    data-iq-gsap="onStart"
                    data-iq-position-x="-200">
                    En İyilerden Yüzlerce Eğitim Videosunu İstediğin Yerde İzle!{" "}
                    <br />
                    Wise&Rise ile Olduğun Yerde Durma, İlerle!
                  </h4>
                  <div className="d-flex flex-wrap align-items-center"></div>
                </Col>
                <Col sm="12" md="6" className="mt-2">
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center mt-0 mt-xs-1">
                    <Link to="/sign-up" className="btn btn-hover">
                      Şimdi İlerle
                    </Link>
                    <Link
                      to="/pracing-plan"
                      className="btn btn-link d-flex price-wrapper mt-1">
                      <div className="price btn-link">
                        <span className="price-item btn-link">
                          {" "}
                          {price[0]?.price} ₺ / Bireysel{" "}
                        </span>
                        <span className="price-item btn-link">
                          {" "}
                          {price[1]?.price} ₺ / Aile
                        </span>
                      </div>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      )}

      <div className="main-content">
        <section id="iq-upcoming-movie" className="mb-5">
          <div className="d-none d-sm-block">
            <Container className="home-page ">
              <Row className="align-items-center">
                <Col sm="12">
                  <div className="text-center ">
                    <h4 className="title mb-5">
                      Herkesin Bir Potansiyeli Vardır! <br /> Yeni Olasılıkların
                      Kilidini Aç ve Becerilerini Geliştir.
                    </h4>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Container>
            <NewClassroomBlock />
          </Container>
        </section>
        {/* start slider */}
        <section id="iq-favorites">
          <Sliders
            headerTitle={"En Çok İzlenenler"}
            prev="prevTrending"
            next="nextTrending"
            type="discover"
          />
        </section>
        {/* end slider */}
        {/* start new classes */}
        {!inLogin && (
          <section>
            <CEOComent />
          </section>
        )}

        {inLogin && (
          <section id="iq-tvthrillers" className="s-margin mb-5">
            <Container>
              <Row>
                <Col sm="12" className="overflow-hidden">
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <h4 className="main-title channel-logo w-100 text-left mt-3">
                      Sana Özel
                    </h4>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        style={{ width: "50px" }}
                        className="d-flex align-items-center justify-content-between mr-3">
                        <div id="prevChoices" className="">
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div id="nextChoices" className="">
                          <i className="fa fa-chevron-right"></i>
                        </div>
                      </div>

                      {/* <Link className="iq-view-all" to="/movie-category">
                      Tümünü Gör
                    </Link> */}
                    </div>
                  </div>
                  <SliderCW
                    prev="prevChoices"
                    next="nextChoices"
                    query={"watching"}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        )}

        {/* end new classes */}
        {/* start Category */}
        {!inLogin && (
          <section>
            <div className="mt-1" style={{ minHeight: "435px" }}>
              <Container className="mt-3">
                <Row className="align-items-center">
                  <Col sm="12" fluid>
                    <div className="text-center iq-breadcrumb-two">
                      <h6 className=" text-primary mb-3">KATEGORİLER</h6>
                      <h3 className="title mb-5">Tüm Eğitimler</h3>
                      <p
                        className="m-auto "
                        style={{ maxWidth: "660px", fontSize: "18px" }}>
                        Her ay yeni isimler&yeni içeriklerle seni ilerlemeye
                        davet ediyoruz! <br /> 9 Farklı Kategoride Gelişmek
                        İstediğin Alanı Seç, Eğitimini Tamamla!
                      </p>
                    </div>
                  </Col>
                </Row>
                <CategoryList />
              </Container>
            </div>
          </section>
        )}
        {/* end Category */}

        {!inLogin && (
          <section className="pt-5 pb-5 d-none d-sm-block">
            <div className="mt-5 mb-5 ">
              <Container>
                <Row className="d-flex align-items-center">
                  <Col sm="12" md="12" lg="6">
                    <div className="d-flex flex-wrap align-items-center">
                      <div
                        className="d-flex align-items-center mt-2 mt-md-3"
                        data-iq-gsap="onStart"
                        data-iq-position-x="-200"
                        data-iq-delay="-0.5"
                        style={{ width: "271px", height: "34px" }}>
                        <span className="fs-2 main-title channel-logo text-uppercase text-primary">
                          Yakında Gelecekler
                        </span>
                      </div>
                    </div>
                    <h4
                      className=" big-title title text-uppercase mt-4 mb-4"
                      data-iq-gsap="onStart"
                      data-iq-position-x="-200"
                      style={{ lineHeight: "40px" }}>
                      HER AY EKLENEN YENİ İÇERİKLERLE <br />
                      İHTİYAÇ DUYDUĞUN HER KONUDA GELİŞ.
                    </h4>
                    <div className="d-flex flex-wrap align-items-center text-left">
                      <p
                        data-iq-gsap="onStart"
                        data-iq-position-y="80"
                        data-iq-delay="0.8">
                        Pek çok kategoride özgün bilgilerle yaşam becerilerini
                        geliştirme imkânı…
                      </p>
                    </div>
                    <div
                      className="d-flex align-items-center r-mb-23 mt-3"
                      data-iq-gsap="onStart"
                      data-iq-position-y="80"
                      data-iq-delay="0.8">
                      <Link to="/kategoriler" className="btn btn-outline-light">
                        Daha Fazla{" "}
                      </Link>
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="6" className="overflow-hidden">
                    <VerticalSlider />
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        )}

        {!inLogin && (
          <section className="py-3 d-none d-sm-block">
            <div className="mt-5 mb-5">
              <Container>
                <Row>
                  <Col sm="12" md="12" lg="6">
                    <TeacherComponent />
                  </Col>
                  <Col sm="12" md="12" lg="6">
                    <div className="d-flex flex-wrap align-items-center">
                      <div
                        className="d-flex align-items-center mt-2 mt-md-3"
                        data-iq-gsap="onStart"
                        data-iq-position-x="-200"
                        data-iq-delay="-0.5"
                        style={{ width: "271px", height: "34px" }}>
                        <span className="fs-2 main-title channel-logo text-uppercase text-primary">
                          EĞİTİMLER
                        </span>
                      </div>
                    </div>
                    <h4
                      className=" big-title title text-uppercase mt-4 mb-4"
                      data-iq-gsap="onStart"
                      data-iq-position-x="-200"
                      style={{ lineHeight: "40px" }}>
                      “DAHA FAZLA BİLGİ İÇİN İLGİNİ ÇEKEN KATEGORİLERİ SEÇ”
                    </h4>
                    <div className="d-flex flex-wrap align-items-center text-left">
                      <p
                        data-iq-gsap="onStart"
                        data-iq-position-y="80"
                        data-iq-delay="0.8">
                        Kategorileri ziyaret edip istediğin eğitimle dönüşümün
                        kapısını arala.
                      </p>
                    </div>
                    <div
                      className="d-flex align-items-center r-mb-23  mt-3"
                      data-iq-gsap="onStart"
                      data-iq-position-y="80"
                      data-iq-delay="0.8">
                      <Link to="/teachers" className="btn btn-outline-light">
                        Tümünü Gör
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        )}
        {/* start teacher */}
        {!inLogin && (
          <section id="iq-favorites" className="mt-3">
            <TeachersSlider link={"teachers"} />
          </section>
        )}
        {/* end teacher */}

        {!inLogin && (
          <section id="iq-favorites">
            <Sliders
              headerTitle={"Öne Çıkan Eğitimler "}
              prev="prevLorem"
              next="nextLorem"
            />
          </section>
        )}

        <section id="iq-favorites">
          <Sliders
            headerTitle="Yeni Eklenenler"
            q="?is_new=1&page[number]=0"
            prev="prevDolor"
            next="nextDolor"
          />
        </section>

        <section id="iq-favorites">
          <Sliders
            headerTitle="Ebeveynlere Özel"
            q="?category_id=8"
            prev="prevDolor1"
            next="nextDolor1"
          />
        </section>

        {inLogin && selected && (
          <section id="iq-tvthrillers" className="s-margin mb-5">
            <Container>
              <Row>
                <Col sm="12" className="overflow-hidden">
                  <div className="d-flex align-items-center justify-content-between  mb-xs-1 mb-md-5 ">
                    <h4 className="main-title channel-logo">
                      Fazil Say'ın seçtikleri
                    </h4>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        style={{ width: "50px" }}
                        className="d-flex align-items-center justify-content-between mr-3">
                        <div id="prevClassics" className="">
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div id="nextClassics" className="">
                          <i className="fa fa-chevron-right"></i>
                        </div>
                      </div>

                      {/* <Link className="iq-view-all" to="/movie-category">
                      Tümünü Gör
                    </Link> */}
                    </div>
                  </div>
                  <ClassesSlider
                    prev="prevClassics"
                    next="nextClassics"
                    query={""}
                    visible={setSelected}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        )}

        {cominSoon && (
          <section id="iq-tvthrillers" className="s-margin mb-5">
            <Container>
              <Row>
                <Col sm="12" className="overflow-hidden">
                  <div className="d-flex align-items-center justify-content-between mb-xs-1 mb-md-5 ">
                    <h4 className="main-title channel-logo w-75 text-left">
                      Yakında Gelecekler
                    </h4>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        style={{ width: "50px" }}
                        className="d-flex align-items-center justify-content-between mr-3">
                        <div id="prevChoices" className="">
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div id="nextChoices" className="">
                          <i className="fa fa-chevron-right"></i>
                        </div>
                      </div>

                      {/* <Link className="iq-view-all" to="/movie-category">
                      Tümünü Gör
                    </Link> */}
                    </div>
                  </div>
                  <ClassesSlider
                    prev="prevChoices"
                    next="nextChoices"
                    query={"?coming_soon=1"}
                    visible={setComingSoon}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        )}

        {!inLogin && (
          <>
            <section className="my-5 d-none d-md-block iq-main-slider p-0 iq-rtl-direction">
              <Container className="px-4">
                <Row>
                  <Col sm="12" className="p-0">
                    <div className="ws-card-right d-flex justify-content-between text-left">
                      <div className="w-75">
                        <h3 className="my-1">Wise&Rise İş Dünyasında!</h3>
                        <p>
                          Wise&Rise ile kurumunuzda bir öğrenme kültürü
                          oluşturun. Grup indirimleri ve daha fazla bilgi için
                          bizimle iletişime geçin.{" "}
                        </p>
                      </div>

                      <div className="d-flex justify-content-center align-items-center">
                        <Link to="/contact-us" className="btn btn-hover ">
                          BİZİMLE İLERLE{" "}
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="iq-main-slider p-0 iq-rtl-direction ">
              <div className="mb-5">
                <Container>
                  <HomeFooterComponent price={price} />
                </Container>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;
