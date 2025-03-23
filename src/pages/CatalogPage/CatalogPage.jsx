import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import { fetchCampers } from "@/store/campers/operations";
import {
  selectLoading,
  selectError,
  selectCampers,
} from "@/store/campers/selectors";
import { selectPagination } from "@/store/pagination/selectors";
import { clearCampers, setAppendMode } from "@/store/campers/slice";
import { setFilter } from "@/store/filter/slice";
import { setPagination } from "@/store/pagination/slice";

import { Filter, ItemsList, VehicleCard, Button } from "@/components";
import { AppLoader, Card as CardItem } from "@/components/UI";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const pagination = useSelector(selectPagination);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleLoadMore = () => {
    const { page } = pagination;
    dispatch(setAppendMode(true));
    dispatch(setPagination({ page: Number(page) + 1 }));
  };

  const searchObj = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  useEffect(() => {
    dispatch(setFilter(searchObj));
    dispatch(fetchCampers());
  }, [pagination.page, dispatch, searchParams]);

  const handleSubmit = (values) => {
    dispatch(clearCampers());
    dispatch(setAppendMode(false));
    dispatch(setPagination({ page: 1, total: 0 }));
    setSearchParams(values);
  };

  const showLoadMore = useMemo(
    () => pagination.page < pagination.total,
    [pagination]
  );

  return (
    <div className="page">
      <div className={clsx("container", css.container)}>
        <Filter onSubmit={handleSubmit} />
        <div style={{ flexGrow: 1 }}>
          {!!error && (
            <CardItem
              variant="error"
              title="An error occurred"
              text={error}
              style={{ maxWidth: 420 }}
            />
          )}
          {!campers.length && !!isLoading && <AppLoader />}
          {campers.length > 0 && (
            <ItemsList
              of={VehicleCard}
              items={campers}
              className={css["cards-list"]}
            />
          )}
          {showLoadMore && (
            <Button
              type="button"
              style="secondary"
              onClick={handleLoadMore}
              isLoading={isLoading}
              className={css["load-more-btn"]}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
