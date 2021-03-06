import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Header,
  Image,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Button,
  Icon,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GameType, MatchType } from "config/propTypes";
import { routes } from "config/routes";
import { Media } from "config/media";
import OctopusWrapper from "components/layout/OctopusWrapper";
import MatchesList from "./MatchesList";
import CreateMatchForm from "./CreateMatchForm";
import FilterBox from "./FilterBox";

const propTypes = {
  matches: PropTypes.arrayOf(MatchType).isRequired,
  currentMatch: MatchType,
  games: PropTypes.arrayOf(GameType).isRequired,
  handleJoinMatch: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

const Lobby = ({
  matches,
  currentMatch,
  games,
  handleJoinMatch,
  handleCreate,
  loading,
  loggedIn,
}) => {
  const { t } = useTranslation("lobby");
  const [filters, setFilters] = useState({
    query: "",
    games: [...games],
  });
  const [filteredMatches, setFilteredMatches] = useState([...matches]);

  useEffect(() => {
    const gameNames = filters.games.map((g) => g.name);
    setFilteredMatches(
      matches.filter(
        ({ gameName, setupData }) =>
          gameNames.includes(gameName) &&
          (!setupData.name || setupData.name.toLowerCase().includes(filters.query.toLowerCase()))
      )
    );
  }, [filters, matches, setFilteredMatches]);

  const styles = {
    noMatchImage: { margin: "0 auto" },
  };

  const createMatchSegment = () => (
    <OctopusWrapper position="bottom-right" color="yellow" rotation="cw">
      <Segment>
        <Header as="h3" textAlign="center">
          {t("create.title")}
        </Header>
        <CreateMatchForm
          loading={loading}
          games={games}
          onCreate={handleCreate}
          disabled={!!currentMatch}
          loggedIn={loggedIn}
        />
      </Segment>
    </OctopusWrapper>
  );

  const loginSegment = () => (
    <OctopusWrapper position="bottom-right" color="yellow" rotation="cw">
      <Segment textAlign="center">
        <Header as="h3" textAlign="center">
          {t("login.title")}
        </Header>
        <Image src="/images/hugo-easy-money.png" />
        <Button as={Link} to={routes.login_guest()} color="orange">
          <Icon name="sign-in" />
          {t("login.button")}
        </Button>
      </Segment>
    </OctopusWrapper>
  );

  const matchesListSegment = () => (
    <OctopusWrapper rotation="ccw">
      <Segment>
        <Header as="h3" textAlign="center">
          {t("list.title")}
        </Header>
        <FilterBox games={games} filters={filters} onChange={setFilters} />
        <div>
          {filteredMatches.length > 0 || currentMatch ? (
            <MatchesList
              matches={filteredMatches}
              games={games}
              currentMatch={currentMatch}
              onJoinMatch={handleJoinMatch}
              loggedIn={loggedIn}
            />
          ) : (
            <>
              <Header as="h4" textAlign="center" color="grey">
                {t("list.empty")}
              </Header>
              <Image style={styles.noMatchImage} src="/images/hugo-out.png" size="medium" />
            </>
          )}
          {loading && (
            <Dimmer active inverted>
              <Loader inverted content={t("list.loading")} />
            </Dimmer>
          )}
        </div>
      </Segment>
    </OctopusWrapper>
  );

  return (
    <Container>
      <Grid as={Media} greaterThanOrEqual="computer">
        <Grid.Column width="12">{matchesListSegment()}</Grid.Column>
        <Grid.Column width="4">{loggedIn ? createMatchSegment() : loginSegment()}</Grid.Column>
      </Grid>
      <Grid as={Media} lessThan="computer">
        {!currentMatch && (
          <Grid.Row>
            <Grid.Column>{loggedIn ? createMatchSegment() : loginSegment()}</Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          <Grid.Column>{matchesListSegment()}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
Lobby.propTypes = propTypes;

export default Lobby;
