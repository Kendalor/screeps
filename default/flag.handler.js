module.exports = {

    /** @param {Flag_list} flag_list **/
    run: function() {
        //Travel to Location
        for(var flag in Game.flags){
            if(Game.flags[flag].color == COLOR_RED){
                if(!Memory.squads[Game.flags[flag].name]){
                    Memory.squads[Game.flags[flag].name]= {}
                    Memory.squads[Game.flags[flag].name].members={};
                    Memory.squads[Game.flags[flag].name].size=1;
                    Memory.squads[Game.flags[flag].name].target=flag;
                    Memory.squads[Game.flags[flag].name].assembled=false;
                    Memory.squads[Game.flags[flag].name].reached=false;

            }
        }





        }
    }




};
