import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Label, Button, Segment, Icon } from "semantic-ui-react";

import Tile from "../Tile";

const propTypes = {
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  playerTiles: PropTypes.arrayOf(PropTypes.object),
  selectTile: PropTypes.func.isRequired,
  selectedTile: PropTypes.object,
  onReturnTiles: PropTypes.func.isRequired,
  onSwapTiles: PropTypes.func.isRequired,
  onSkipTurn: PropTypes.func.isRequired,
  onPlayTiles: PropTypes.func.isRequired,
  canReturnTiles: PropTypes.bool,
  canSwapTiles: PropTypes.bool,
  canPlayTiles: PropTypes.bool,
  tilesLeft: PropTypes.number,
};

const TilesPanel = ({
  t,
  disabled,
  playerTiles,
  selectTile,
  selectedTile,
  onReturnTiles,
  onSwapTiles,
  onSkipTurn,
  onPlayTiles,
  canReturnTiles,
  canSwapTiles,
  canPlayTiles,
  tilesLeft,
}) => (
  <Segment>
    <Label as="span" color="green" ribbon>
      <Icon name="star" />
      {t("panel.tiles")}
    </Label>
    {tilesLeft && (
      <Label attached="top right">
        {t("game.info.tiles.left")}: {tilesLeft}
      </Label>
    )}
    <div style={{ display: "flex", paddingTop: 10 }}>
      {playerTiles &&
        playerTiles.map((tile) => (
          <Tile
            separate
            key={tile.id}
            onClick={() => selectTile(tile)}
            raised={selectedTile === tile}
            used={tile.x !== undefined && tile.y !== undefined}
            disabled={disabled}
            {...tile}
          />
        ))}
      <Button color="red" onClick={onReturnTiles} disabled={disabled || !canReturnTiles}>
        <Icon name="undo" />
        {t("panel.actions.return")}
      </Button>
      <Button color="orange" onClick={onSwapTiles} disabled={disabled || !canSwapTiles}>
        <Icon name="refresh" />
        {t("panel.actions.swap")}
      </Button>
      <Button color="yellow" onClick={onSkipTurn} disabled={disabled}>
        <Icon name="forward" />
        {t("panel.actions.skip")}
      </Button>
      <Button color="green" onClick={onPlayTiles} disabled={disabled || !canPlayTiles}>
        <Icon name="check" />
        {t("panel.actions.play")}
      </Button>
    </div>
  </Segment>
);

TilesPanel.propTypes = propTypes;
export default withTranslation("scrambled")(TilesPanel);
