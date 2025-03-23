import { useEffect, useMemo, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import clsx from "clsx";

import {
  selectCamperById,
  selectLoading,
  selectError,
} from "@/store/campers/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "@/store/campers/operations";

import {
  Loader,
  Heading,
  ItemsList,
  Thumbnail,
  VehicleFeaturesSpecs,
  Button,
} from "@/components";
import BookingForm from "@/components/BookingForm/BookingForm";
import {
  Card,
  Tabs,
  Modal,
} from "@/components/UI";

import css from "./DetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = useSelector((state) => selectCamperById(state, id));
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const tabsRef = useRef(null);
  const isTabClickRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const tabsList = ["features", "reviews"];

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isTabClickRef.current) {
      isTabClickRef.current = false;
      return;
    }

    // Reset scroll position to the top when navigating to a new item or tab
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Scroll to review page from the page top
    if (location.pathname.endsWith(`${id}/reviews`) && tabsRef.current) {
      tabsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [id, location]);

  const { thumbs = [], images = [] } = useMemo(() => {
    if (!vehicle?.gallery) {
      return {
        thumbs: [],
        images: []
      };
    }

    return vehicle.gallery.reduce(
      (acc, { thumb, original }, index) => {
        acc.thumbs.push({ id: index, src: thumb });
        acc.images.push({ id: index, src: original });
        return acc;
      },
      { thumbs: [], images: [] }
    );
  }, [vehicle]);

  const activeTab = useMemo(() => {
    if (location.pathname.endsWith("/reviews")) {
      return "reviews";
    }
    return "features";
  }, [location]);



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageClick = ({ id }) => {
    const { src = "" } = images.find((img) => img.id === id);
    setActiveImage(src);
    openModal(true);
  };

  const handleTabClick = (tabName) => {
    isTabClickRef.current = true;
    if (tabName === "features") {
      navigate(`/catalog/${id}`, { replace: true });
    } else {
      navigate(`/catalog/${id}/${tabName}`, { replace: true });
    }
  };

  return (
    <>
      {!!error && (
        <section className={"container"}>
          <Card variant="error" title="Something went wrong" text={error}>
            <Button type="link" to="/catalog" style="secondary">Go to Catalog</Button>
          </Card>
        </section>
      )}
      {/*{!isLoading && !vehicle && <Loader />}*/}
      {vehicle?.id && (
        <>
          <section className={"container"}>
            <Heading
              id={vehicle.id}
              title={vehicle.name}
              price={vehicle.price}
              rating={vehicle.rating}
              location={vehicle.location}
              reviewsNumber={vehicle.reviews?.length ?? 0}
              className={css.heading}
            />

            <ItemsList
              of={Thumbnail}
              items={thumbs}
              onClick={handleImageClick}
              onKeyDown={handleImageClick}
              className={css["image-gallery"]}
              aria-haspopup="true"
            />

            <p className={css.description}>{vehicle.description}</p>
          </section>

          <section className={clsx(css["feature-reviews-section"], "container")}>
            <div className={css["tabs-wrapper"]}>
              <div ref={tabsRef} className={clsx(css.tabs)}>
                <Tabs
                  tabs={tabsList}
                  active={activeTab}
                  onClick={handleTabClick}
                  onKeyDown={handleTabClick}
                  tabIndex={0}
                />
              </div>
              <div className={css["feature-reviews-content"]}>
                {activeTab === "features"
                  &&  <VehicleFeaturesSpecs
                        vehicleData={vehicle}
                        className={clsx(css.features, css["tab-content"])}
                      />
                }
                {activeTab === "reviews"
                  &&  <Outlet
                        context={vehicle.reviews}
                        className={clsx(css["booking-form"], css["tab-content"])}
                      />
                }
                <BookingForm className={css["booking-form"]} />
              </div>
            </div>
          </section>
        </>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <img className={css.modalImg} src={activeImage} alt="" />
        </Modal>
      )}
    </>
  );
};

export default CamperDetailsPage;
