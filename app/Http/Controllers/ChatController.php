<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageSent;
class ChatController extends Controller
{
    public function getMessages()
    {
        return response()->json(Message::latest()->take(50)->get());
    }

    public function sendMessage(Request $request)
    {
        $validatedData = $request->validate([
            'sender' => 'required|string',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender' => $request->sender,
            'message' => $request->message,
        ]);



        broadcast(new MessageSent($message))->toOthers();


        return response()->json($message, 201);
    }
    public function index()
    {
        return view('index');
    }
    

}
