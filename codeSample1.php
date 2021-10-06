//returns a random string of specified length
function rand_string($length){
            $chars = "abcdefghijkmnpqrstuvwxyz0123456789";

           //substr- Returns the portion of string specified in the first parameter
           //by the second parameter(offset) and third parameter(length of substring).

           //str_shuffle — Randomly shuffles a string
            return substr(str_shuffle($chars), 0, $length);
}
    
//returns unique ticket
function get_ticket_number($new_ticket_number, $ticket_queue){
            //check our ticket listing to see if we have that ticket already, if we dont we return otherwise we try a new ticket number
            foreach ($ticket_queue as $existing_ticket) {
                if ($existing_ticket->ticket_id == $new_ticket_number) {
                    return get_ticket_number(rand_string(12), $ticket_queue);
                }
            }
    return $new_ticket;
}

//log a new user ticket
public function log_user_ticket(Request $request){
              
    if(empty($request->name)){
          return ["status" => 'error', "msg" =>  "User name is missing."];
    }

    //insert new user into database based on name and new ticket number assigned
    try{
      $result = DB::transaction(function() use($request) {
        DB::table('users')->insert([
            'name' => $request->name,
           'ticket_number'=>get_ticket_number(rand_string(12), $request->existing_tickets),
          'collection_time' => Carbon::now(),
        ]); 
      });//end transaction
      return ["status" => 'error', "msg" =>  "User ticket successfully logged"];
    }

    catch (\Exception $e) {
      return redirect()->route('signupFail', ["msg" => $e->getMessage()]);  
    }
}
