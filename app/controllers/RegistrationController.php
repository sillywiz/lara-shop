<?php

class RegistrationController extends \BaseController {

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        $validator = Validator::make(Input::all(), User::$rules);

        if($validator->passes()) {
            $this->user->create(Input::all());
            return Response::json([
                    'status' => 'success',
                ],
                202
            );
        }
        $messages = $validator->messages()->toArray();

        foreach($messages as $key => $message) {
            $response[] = array('type' => "warning", 'msg' => $message[0]);
        }

        return Response::json($response, 400);
	}


}
