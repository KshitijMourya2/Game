import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Button } from 'reactstrap';
import { range } from 'underscore';
import classnames from 'classnames';

export default function game_init(root) {
  ReactDOM.render(<Checkers />, root);
}

function generate_red_piece()
  {
    let makepieces=[];
    let newarray = [1,3,5,7,8,10,12,14,17,19,35,23];
    for(let i=0;i<12;i++)
    {
      let piece={
        id:i,
        color:'red',
        pos:newarray[i],
        killed:false,
        king:false,
        score:0,};
        makepieces.push(piece);
    }
  return makepieces;

}

function generate_black_piece()
  {
    let makepieces=[];
    let newarray = [40,42,44,46,49,51,53,55,56,58,60,62];
    for(let i=0;i<12;i++)
    {
      let piece={
        id:i,
        color:'black',
        pos:newarray[i],
        killed:false,
        king:false,
        score:0,};
        makepieces.push(piece);
    }
  return makepieces;

}

function timer() {
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
});
}

class Checkers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       pieces: {
            red: generate_red_piece(),
            black: generate_black_piece()
       },
       prevclick:100,
       prev_opp:'none'
   };
   this.getTiles = this.getTiles.bind(this);

 }

  getTiles()
  {
    let allTiles = [];

    for(let i=0;i<64;i++)
    {
      let oneTile = (<Tile id={i}
                           key={i}
                           pieces={this.state.pieces}
                           prevclick={this.state.prevclick}
                           player={this.state.prev_opp}
                           pieceClicked={this.pieceClicked.bind(this)}
                           movepiece={this.movepiece.bind(this)}/>);
      allTiles.push(oneTile);
    }

    return allTiles;
  }

  movepiece(id,piece_id,color){
    if (color == 'red'){
        this.state.pieces.red[piece_id].pos = id;
        let temp = this.state.pieces
        this.setState({pieces: temp});
    }else{
    }
  }

  pieceClicked(id,piece_id,color)
  {
    var piece_clicked;

    this.setState({prevclick:piece_id})
    this.setState({prev_opp:color})

    if(color == 'red')
    {
      piece_clicked = this.state.pieces.red[piece_id];
    }
    else{
      piece_clicked = this.state.pieces.black[piece_id]
    }
  }

  render()
  {
    let tiles = this.getTiles();

    return(
            <div id="layout">
            <div text-align="center" id="basicUsage">00:00:00</div>
            {tiles}
            </div>
          );
  }
}

function Tile(props) {
  const {id, pieces}= props;
  let found = 'none'
  let p_id = 100
  var color ='';

  if((parseInt(id / 8))%2==0)
  {
    if(id % 2 == 0)
    {
      color = "#f4e7d7";
    }
    else
    {
      color = "#994d00";
    }
  }
  else
  {
    if(id % 2 == 0)
    {
      color = "#994d00";
    }
    else
    {
      color = "#f4e7d7";
    }
  }

  var clickable = false;
  if (props.player == 'red'){
      let pos = pieces.red[props.prevclick].pos;
      let validmove1 = pos+7;
      let validmove2 = pos+9;
      if(validmove1 === id || validmove2 === id){
          clickable = true;
      }

  }
  else if(props.player == 'black'){
      let pos = pieces.black[props.prevclick].pos;
      let validmove1 = pos-7;
      let validmove2 = pos-9;
      if(validmove1 == id || validmove2 == id){
            clickable = true;
      }
  }


  for(let i=0;i<12;i++)
    {
        if(pieces.red[i].pos === id) {
            found = 'red'
            p_id  = pieces.red[i].id
          }
        else if (pieces.black[i].pos === id){
            found = 'black'
            p_id = pieces.black[i].id
          }
    }
  var className = classnames(
               'empty':true,
              {'red piece king': (found === 'red') && (pieces.red[p_id].king) === true},
              {'black piece king': (found === 'black') && (pieces.black[p_id].king) === true},
              {'red piece': (found === 'red') && (pieces.red[p_id].king === false)},
              {'black piece': (found === 'black') && (pieces.black[p_id].king === false)},
              );

  return (
            <div className="tile" style={{backgroundColor: color}}
            onClick={clickable ? () => props.movepiece(id, props.prevclick, props.player) : null}>
              <div className ={className} onClick={() => props.pieceClicked(id, p_id, found)}/>
            </div>

  );
}
