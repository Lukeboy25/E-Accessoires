import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  StyleSheet, 
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { requestTokenNL, requestTokenBE } from '../store/token/tokenActions';
import { getOrders } from '../store/order/orderActions';
import {
  OpenOrders,
  Header,
  Pagination,
  LoadingSpinner,
  NoNetworkNote,
} from '../components';

class HomeScreen extends Component {
  state = { languageState: 'NL', page: 1, selectedOrderCategory: undefined };

  async componentDidMount() {
    await this.requestOrders();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.languageState !== this.state.languageState) {
      await this.requestOrders();
    }
  }

  requestOrders = async () => {
    try {
      if (this.state.languageState == 'NL') {
        await this.props.requestTokenNL();
      } else {
        await this.props.requestTokenBE();
      }

      await this.props.getOrders(this.state.languageState, this.state.page, this.state.selectedOrderCategory);
    } catch (e) {
      console.error(e);
    }
  };

  switchLanguage = () => {
    this.setState(() => ({ page: 1, selectedOrderCategory: '' }));

    if (this.state.languageState === 'NL') {
      this.setState({ languageState: 'BE' });
    } else {
      this.setState({ languageState: 'NL' });
    }
  };

  setPage = (page) => {
    this.setState(() => ({ page }));
    this.requestOrders();
  };

  onSelectedOrderCategory = (selectedOrderCategory) => {
    this.setState(() => ({ selectedOrderCategory }));
  };

  render() {
    if (!this.props.hasConnection) {
      return (
        <>
          <StatusBar barStyle="light-content" />
          <Header />
          <NoNetworkNote />
        </>
      );
    }

    return (
      <>
        <ScrollView
          style={styles.background}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={this.props.isLoading} onRefresh={this.requestOrders} />}
        >
          <StatusBar barStyle="light-content" />
          <Header />
          {this.props.openOrders && (
            <OpenOrders
              isLoading={this.props.isLoading}
              fetchOrders={this.requestOrders}
              switchLanguage={this.switchLanguage}
              openOrders={this.props.openOrders}
              orderAmount={this.props.orderAmount}
              toast={this.toast}
              languageState={this.state.languageState}
              page={this.state.page}
              selectedOrderCategory={this.state.selectedOrderCategory}
              onSelectedOrderCategory={this.onSelectedOrderCategory}
            />
          )}
          {/* <BackgroundFetcher openOrdersAmount={this.props.openOrders.length} /> */}
          {!this.state.selectedOrderCategory && this.props.orderPages > 1
          && (
          <Pagination
            onPageChange={(page) => this.setPage(page)}
            page={this.state.page}
            totalPages={this.props.orderPages}
          />
          )}
        </ScrollView>
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={styles.defaultToast}
          position="top"
          positionValue={0}
          fadeInDuration={800}
          fadeOutDuration={1400}
          textStyle={{ color: 'white' }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  defaultToast: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 8,
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  tokenBE: state.token.tokenBE,
  openOrders: state.order.openOrders,
  orderAmount: state.order.orderAmount,
  orderPages: state.order.orderPages,
  isLoading: state.order.isLoading,
  hasConnection: state.network.hasConnection,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    requestTokenNL,
    requestTokenBE,
    getOrders,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
