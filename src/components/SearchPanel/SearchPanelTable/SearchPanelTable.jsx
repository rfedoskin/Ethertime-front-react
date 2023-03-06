import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './searchPanelTable.module.scss';
import {
  showNextPage,
  showPrevPage,
  showPageByNumber,
} from '../../../redux/actions/lotteriesSearchPaginationActions';
import {
  loadPlayerLotteries,
  loadPlayerLotteriesDetails,
  clearSearch,
  getPlayerWinnings,
} from '../../../redux/actions/lotteriesSearchActions';
import {
  getPageCount,
  getLotteriesPerPage,
} from '../../../redux/selectors/lotteriesSearchSelectors';
import {
  getLotteriesCount,
  searchPageIsLoading,
  getSearchError,
} from '../../../redux/reducers/lotteriesSearchReducer';
import {
  getCurrentPage,
  getPageSize,
} from '../../../redux/reducers/lotteriesSearchPaginationReducer';
import { getContract } from '../../../redux/reducers/contractReducer';
import LotteryAge from './LotteryAge';
import ProgressBar from '../../ProgressBar';
import CashbackIcon from '../../LotteryTableLayout/CashbackPopover/CashbackIcon';
import PaginationButton from '../PaginationButton';
import Popover from '../../Popover';
import WinningsCaption from '../WinningsCaption';

class SearchPanelTable extends React.Component {
  componentDidMount() {
    const { accountAddress, loadSearchResults } = this.props;

    loadSearchResults(accountAddress);
  }

  componentWillUnmount() {
    const { clearSearchResults } = this.props;

    clearSearchResults();
  }

  handleNextPageClick = () => {
    const { goToNextPage, pageCount, loadLotteriesDetails } = this.props;

    goToNextPage(pageCount);
    loadLotteriesDetails();
  };

  handlePrevPageClick = () => {
    const { goToPrevPage, loadLotteriesDetails } = this.props;

    goToPrevPage();
    loadLotteriesDetails();
  };

  handleLastPageClick = () => {
    const { goToLastPage, pageCount, loadLotteriesDetails } = this.props;

    goToLastPage(pageCount);
    loadLotteriesDetails();
  };

  render() {
    const {
      t: translation,
      pageSize,
      currentPage,
      pageCount,
      searchPageLoading,
      searchResults,
      searchResultsCount,
      searchError,
      getWinnings,
    } = this.props;

    if (searchPageLoading) {
      return (
        <div className={styles.loader}>
          <ProgressBar width="57" height="50" spinner idSpacename="search-loader" />
        </div>
      );
    }

    if (searchError) {
      return <span className={styles.errorMessage}>{searchError}</span>;
    }

    const winAwaitPopover = (
      <div className={styles.winAwaitPopover}>
        {translation('searchPanelTable.winNumberAwaitPopup')}
      </div>
    );

    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr className={cn(styles.row, styles.rowHead)}>
              <th className={cn(styles.th, styles.th1)}>{translation('searchPanelTable.id')}</th>
              <th className={cn(styles.th, styles.th2)}>{translation('searchPanelTable.time')}</th>
              <th className={cn(styles.th, styles.th4)}>
                {translation('searchPanelTable.yourNumbers')}
              </th>
              <th className={cn(styles.th, styles.th3)}>
                {translation('searchPanelTable.winNumber')}
              </th>
              <th className={styles.th}>{translation('searchPanelTable.winAmount')}</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((lottery, idx) => {
              const { playerNumbers = [] } = lottery;
              const playerNumbersCount = playerNumbers.length;
              const lotteryStatus = lottery.status;

              return (
                <tr className={styles.row} key={lottery.id}>
                  <td>{lottery.rootId}</td>
                  <td className={styles.timeCell}>
                    <LotteryAge lotteryEnd={lottery.end} />
                  </td>
                  <td>
                    {playerNumbersCount > 0 &&
                      playerNumbers.map((number, i) =>
                        i === playerNumbersCount - 1 ? `${number}` : `${number}, `
                      )}
                  </td>
                  <td className={styles.winNumCell}>
                    {lotteryStatus === 0 && (
                      <ProgressBar
                        width="40"
                        height="40"
                        spinner
                        idSpacename="search-winNumber"
                        idKey={idx}
                      />
                    )}
                    {lotteryStatus === 1 && <span>{lottery.winNumber}</span>}
                    {lotteryStatus === 2 && <span>&mdash;</span>}
                  </td>
                  <td>
                    {lotteryStatus === 0 && (
                      <div className={styles.popoverIcon}>
                        <Popover body={winAwaitPopover} preferPlace="left">
                          <CashbackIcon />
                        </Popover>
                      </div>
                    )}
                    {lotteryStatus === 1 &&
                      (lottery.won && (
                        <WinningsCaption
                          id={lottery.id}
                          prize={lottery.totalPrize}
                          isPaid={lottery.paidOut}
                          isPaying={lottery.payingOut}
                          onClick={getWinnings}
                        />
                      ))}
                    {lotteryStatus === 2 && <span>&mdash;</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {searchResultsCount > pageSize && (
          <div className={styles.pagination}>
            <div className={styles.playerParticipations}>
              {`${translation('searchPanelTable.allParticipation')}:`}
              <br />
              {searchResultsCount}
            </div>
            <div className={styles.paginationButtons}>
              <PaginationButton
                isPrev
                onClick={this.handlePrevPageClick}
                isDisabled={currentPage === 1}
              />
              <span className={styles.pages}>
                {currentPage}
/
                {pageCount}
              </span>
              <PaginationButton
                isNext
                onClick={this.handleNextPageClick}
                isDisabled={currentPage === pageCount}
              />
            </div>
            <div className={styles.paginationLast}>
              <PaginationButton
                isLast
                onClick={this.handleLastPageClick}
                caption={translation('searchPanelTable.lastPageButton')}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  contract: getContract(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  searchPageLoading: searchPageIsLoading(state),
  searchResults: getLotteriesPerPage(state),
  searchResultsCount: getLotteriesCount(state),
  pageCount: getPageCount(state),
  searchError: getSearchError(state),
});

const mapDispatchToProps = dispatch => ({
  loadSearchResults: playerAddress => dispatch(loadPlayerLotteries(playerAddress)),
  loadLotteriesDetails: () => dispatch(loadPlayerLotteriesDetails()),
  goToNextPage: pageCount => dispatch(showNextPage(pageCount)),
  goToPrevPage: () => dispatch(showPrevPage()),
  goToLastPage: page => dispatch(showPageByNumber(page)),
  clearSearchResults: () => dispatch(clearSearch()),
  getWinnings: lotteryId => dispatch(getPlayerWinnings(lotteryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SearchPanelTable));
